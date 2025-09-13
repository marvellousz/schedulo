/**
 * Exponential backoff retry utility for Google API rate limits
 */

export interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  jitter?: boolean;
  retryCondition?: (error: RetryableError) => boolean;
  onRetry?: (error: RetryableError, attempt: number) => void;
}

export interface RetryableError extends Error {
  status?: number;
  code?: string | number;
  response?: {
    status?: number;
    data?: unknown;
  };
}

/**
 * Default retry condition for Google API errors
 */
export const isRetryableGoogleApiError = (error: RetryableError): boolean => {
  // Check for rate limit errors (429)
  if (error.status === 429 || error.response?.status === 429) {
    return true;
  }

  // Check for server errors (5xx)
  if (error.status && error.status >= 500) {
    return true;
  }
  
  if (error.response?.status && error.response.status >= 500) {
    return true;
  }

  // Check for specific Google API error codes
  if (error.code) {
    const retryableCodes = [
      'RATE_LIMIT_EXCEEDED',
      'USER_RATE_LIMIT_EXCEEDED',
      'QUOTA_EXCEEDED',
      'INTERNAL_ERROR',
      'BACKEND_ERROR',
      'SERVICE_UNAVAILABLE',
      'TIMEOUT',
      'DEADLINE_EXCEEDED'
    ];
    
    if (typeof error.code === 'string' && retryableCodes.includes(error.code)) {
      return true;
    }
  }

  // Check for network errors
  if (error.message) {
    const networkErrorPatterns = [
      /ECONNRESET/,
      /ENOTFOUND/,
      /ETIMEDOUT/,
      /ECONNREFUSED/,
      /socket hang up/i,
      /network timeout/i
    ];
    
    return networkErrorPatterns.some(pattern => pattern.test(error.message));
  }

  return false;
};

/**
 * Calculate delay with exponential backoff and optional jitter
 */
export const calculateDelay = (
  attempt: number,
  baseDelay: number,
  maxDelay: number,
  backoffMultiplier: number,
  jitter: boolean
): number => {
  const exponentialDelay = Math.min(
    baseDelay * Math.pow(backoffMultiplier, attempt),
    maxDelay
  );

  if (jitter) {
    // Add random jitter to prevent thundering herd
    const jitterAmount = exponentialDelay * 0.1;
    return exponentialDelay + (Math.random() - 0.5) * 2 * jitterAmount;
  }

  return exponentialDelay;
};

/**
 * Sleep for specified milliseconds
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 5,
    baseDelay = 1000,
    maxDelay = 30000,
    backoffMultiplier = 2,
    jitter = true,
    retryCondition = isRetryableGoogleApiError,
    onRetry
  } = options;

  let lastError: RetryableError | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as RetryableError;

      // Don't retry if this is the last attempt
      if (attempt === maxRetries) {
        break;
      }

      // Check if error is retryable
      if (!retryCondition(lastError)) {
        throw lastError;
      }

      // Calculate delay for next attempt
      const delay = calculateDelay(
        attempt,
        baseDelay,
        maxDelay,
        backoffMultiplier,
        jitter
      );

      // Call onRetry callback if provided
      if (onRetry) {
        onRetry(lastError, attempt + 1);
      }

      console.warn(`Retrying after error (attempt ${attempt + 1}/${maxRetries + 1}):`, {
        error: lastError.message,
        status: lastError.status || lastError.response?.status,
        code: lastError.code,
        delay: Math.round(delay),
        nextAttempt: attempt + 2
      });

      // Wait before retrying
      await sleep(delay);
    }
  }

  // All retries exhausted, throw the last error
  throw lastError || new Error('Unknown error occurred during retry attempts');
}

/**
 * Wrapper for Google Calendar API calls with retry logic
 */
export const retryGoogleCalendarCall = <T>(
  fn: () => Promise<T>,
  operationName = 'Google Calendar API call'
): Promise<T> => {
  return retryWithBackoff(fn, {
    maxRetries: 5,
    baseDelay: 1000,
    maxDelay: 32000,
    onRetry: (error, attempt) => {
      console.log(`${operationName} failed, retrying (attempt ${attempt}):`, {
        error: error.message,
        status: error.status || error.response?.status
      });
    }
  });
};

/**
 * Wrapper for Google OAuth2 API calls with retry logic
 */
export const retryGoogleOAuthCall = <T>(
  fn: () => Promise<T>,
  operationName = 'Google OAuth2 API call'
): Promise<T> => {
  return retryWithBackoff(fn, {
    maxRetries: 3,
    baseDelay: 500,
    maxDelay: 8000,
    onRetry: (error, attempt) => {
      console.log(`${operationName} failed, retrying (attempt ${attempt}):`, {
        error: error.message,
        status: error.status || error.response?.status
      });
    }
  });
};

/**
 * Wrapper for Gmail API calls with retry logic
 */
export const retryGmailCall = <T>(
  fn: () => Promise<T>,
  operationName = 'Gmail API call'
): Promise<T> => {
  return retryWithBackoff(fn, {
    maxRetries: 4,
    baseDelay: 1000,
    maxDelay: 16000,
    onRetry: (error, attempt) => {
      console.log(`${operationName} failed, retrying (attempt ${attempt}):`, {
        error: error.message,
        status: error.status || error.response?.status
      });
    }
  });
};