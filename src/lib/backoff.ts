/**
 * Exponential backoff retry utility for Google API rate limits
 * 
 * This utility wraps async functions and retries them with exponential backoff
 * when Google API rate limit errors are encountered (HTTP 429 or specific error reasons).
 * 
 * @example
 * ```typescript
 * import { withExponentialBackoff } from '@/lib/backoff';
 * 
 * const retryableApiCall = withExponentialBackoff(
 *   () => calendar.events.insert(params),
 *   { maxRetries: 3, baseDelay: 1000 }
 * );
 * 
 * const result = await retryableApiCall();
 * ```
 */

/**
 * Configuration options for exponential backoff retry logic
 */
export interface BackoffConfig {
  /** Maximum number of retry attempts (default: 3) */
  maxRetries?: number;
  /** Base delay in milliseconds between retries (default: 1000ms) */
  baseDelay?: number;
  /** Maximum delay in milliseconds to prevent excessively long waits (default: 30000ms) */
  maxDelay?: number;
  /** Whether to add jitter to prevent thundering herd effect (default: true) */
  useJitter?: boolean;
}

/**
 * Default backoff configuration
 */
const DEFAULT_CONFIG: Required<BackoffConfig> = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 30000,
  useJitter: true,
};

/**
 * Generic function type that we can retry
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RetryableFunction = (...args: any[]) => Promise<any>;

/**
 * Checks if an error is a Google API rate limit error that should trigger a retry
 */
function isRateLimitError(error: unknown): boolean {
  // Check for HTTP 429 status code
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((error as any)?.response?.status === 429 || (error as any)?.status === 429) {
    return true;
  }

  // Check for Google API specific rate limit error reasons
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorMessage = (error as any)?.message?.toLowerCase() || '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorCode = (error as any)?.code?.toLowerCase() || '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorReason = (error as any)?.errors?.[0]?.reason?.toLowerCase() || '';
  
  // Google API rate limit error reasons
  const rateLimitReasons = [
    'ratelimitexceeded',
    'userratelimitexceeded',
    'quotaexceeded',
    'dailylimitexceeded',
  ];

  // Check various error properties where rate limit info might be stored
  return (
    rateLimitReasons.some(reason => 
      errorMessage.includes(reason) ||
      errorCode.includes(reason) ||
      errorReason.includes(reason)
    ) ||
    errorMessage.includes('rate limit') ||
    errorMessage.includes('quota exceeded') ||
    errorMessage.includes('too many requests')
  );
}

/**
 * Calculates the delay for the next retry attempt using exponential backoff
 */
function calculateDelay(attempt: number, config: Required<BackoffConfig>): number {
  // Calculate exponential delay: baseDelay * 2^attempt
  let delay = config.baseDelay * Math.pow(2, attempt);
  
  // Apply maximum delay cap
  delay = Math.min(delay, config.maxDelay);
  
  // Add jitter if enabled (random factor between 0.5 and 1.5)
  if (config.useJitter) {
    const jitterFactor = 0.5 + Math.random(); // Random value between 0.5 and 1.5
    delay = delay * jitterFactor;
  }
  
  return Math.floor(delay);
}

/**
 * Wraps an async function with exponential backoff retry logic for Google API rate limits
 * 
 * @param fn - The async function to wrap with retry logic
 * @param options - Configuration options for the backoff behavior
 * @returns A new async function that will retry on rate limit errors
 */
export function withExponentialBackoff<T extends RetryableFunction>(
  fn: T,
  options: BackoffConfig = {}
): T {
  const config = { ...DEFAULT_CONFIG, ...options };

  return ((...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    return executeWithBackoff(fn, args, config);
  }) as T;
}

/**
 * Internal function that handles the actual retry logic
 */
async function executeWithBackoff<T extends RetryableFunction>(
  fn: T,
  args: Parameters<T>,
  config: Required<BackoffConfig>
): Promise<Awaited<ReturnType<T>>> {
  let lastError: unknown;
  
  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      // Execute the function
      const result = await fn(...args);
      
      // If we get here, the function succeeded
      if (attempt > 0) {
        console.log(`Google API call succeeded after ${attempt} retries`);
      }
      
      return result;
    } catch (error) {
      lastError = error;
      
      // If this is the last attempt, throw the error
      if (attempt === config.maxRetries) {
        console.error(`Google API call failed after ${config.maxRetries} retries:`, error);
        throw error;
      }
      
      // Check if this is a rate limit error that we should retry
      if (!isRateLimitError(error)) {
        console.error('Google API call failed with non-rate-limit error, not retrying:', error);
        throw error;
      }
      
      // Calculate delay for next attempt
      const delay = calculateDelay(attempt, config);
      
      console.log(
        `Google API rate limit hit (attempt ${attempt + 1}/${config.maxRetries + 1}), ` +
        `retrying in ${delay}ms...`
      );
      
      // Wait before next attempt
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // This should never be reached, but just in case
  throw lastError;
}

/**
 * Convenience function for creating a retryable Google Calendar API call
 * Pre-configured with sensible defaults for Calendar API operations
 */
export function withCalendarRetry<T extends RetryableFunction>(
  fn: T,
  options: Partial<BackoffConfig> = {}
): T {
  // Calendar-specific defaults
  const calendarDefaults: BackoffConfig = {
    maxRetries: 5, // Calendar operations can be more tolerant
    baseDelay: 1000,
    maxDelay: 16000, // Cap at 16 seconds for calendar operations
    useJitter: true,
  };
  
  return withExponentialBackoff(fn, { ...calendarDefaults, ...options });
}