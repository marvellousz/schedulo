# Google API Exponential Backoff Retry Logic

This document describes the exponential backoff retry logic implemented for Google API rate limit handling in the Schedulo application.

## Overview

The application integrates with several Google APIs:
- **Google Calendar API** - for creating calendar events with Google Meet
- **Google OAuth2 API** - for token refresh operations  
- **Gmail API** - for sending emails via OAuth2

To handle rate limits and temporary failures, we've implemented comprehensive retry logic with exponential backoff.

## Implementation

### Core Retry Utility (`/src/lib/utils/retry.ts`)

The main retry utility provides:

- **Exponential backoff** with configurable parameters
- **Jitter** to prevent thundering herd problems
- **Smart error detection** for Google API specific errors
- **Configurable retry conditions** and callbacks
- **Specialized wrappers** for different Google APIs

### Key Features

#### 1. Retry Conditions

The system automatically retries on:
- **HTTP 429** (Rate Limit Exceeded)
- **HTTP 5xx** (Server Errors)
- **Google API Error Codes**:
  - `RATE_LIMIT_EXCEEDED`
  - `USER_RATE_LIMIT_EXCEEDED`
  - `QUOTA_EXCEEDED`
  - `INTERNAL_ERROR`
  - `BACKEND_ERROR`
  - `SERVICE_UNAVAILABLE`
  - `TIMEOUT`
  - `DEADLINE_EXCEEDED`
- **Network Errors** (connection timeouts, resets, etc.)

#### 2. Exponential Backoff Configuration

| API Type | Max Retries | Base Delay | Max Delay | Backoff Multiplier |
|----------|-------------|------------|-----------|-------------------|
| Google Calendar | 5 | 1000ms | 32000ms | 2x |
| Google OAuth2 | 3 | 500ms | 8000ms | 2x |
| Gmail API | 4 | 1000ms | 16000ms | 2x |

#### 3. Jitter Implementation

Random jitter (±10% of calculated delay) is added to prevent synchronized retry attempts from multiple clients.

## Integration Points

### 1. Google Calendar API (`/src/app/api/meet/route.ts`)

```typescript
import { retryGoogleCalendarCall } from "@/lib/utils/retry";

// Create calendar event with retry logic
const event = await retryGoogleCalendarCall(
  () => calendar.events.insert({...}),
  'Google Calendar event creation'
);
```

### 2. Google OAuth2 Token Refresh (`/src/lib/auth-config.ts`)

```typescript
import { retryGoogleOAuthCall } from "./utils/retry";

// Token refresh with retry logic
const refreshedTokens = await retryGoogleOAuthCall(async () => {
  const response = await fetch(url, {...});
  // ... error handling
  return responseData;
}, 'Google OAuth2 token refresh');
```

### 3. Gmail API (`/src/app/api/email/route.ts`)

```typescript
import { retryGmailCall } from "@/lib/utils/retry";

// SMTP verification with retry
await retryGmailCall(
  () => transporter.verify(),
  'Gmail SMTP connection verification'
);

// Email sending with retry
const info = await retryGmailCall(
  () => transporter.sendMail(mailOptions),
  'Gmail email sending'
);
```

## Error Handling

### Server-Side Error Responses

When retries are exhausted, the APIs return specific error responses:

#### Rate Limit Exceeded (HTTP 429)
```json
{
  "error": "Google Calendar API rate limit exceeded",
  "details": "Please try again in a few minutes. Google has temporarily limited requests.",
  "retryAfter": 60
}
```

### Client-Side Error Handling

The frontend handles rate limit responses gracefully:

```typescript
if (response.status === 429) {
  toast.error(`Google Calendar rate limit exceeded. ${errorData.details || 'Please try again in a few minutes.'}`);
  return;
}
```

## Monitoring and Logging

### Retry Attempts
Each retry attempt is logged with:
- Error message and status code
- Attempt number
- Calculated delay
- Next attempt number

### Example Log Output
```
Retrying after error (attempt 2/6): {
  error: "Rate limit exceeded",
  status: 429,
  delay: 2000,
  nextAttempt: 3
}
```

## Configuration

### Environment Variables

No additional environment variables are required. The retry logic uses the existing Google API credentials:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXTAUTH_SECRET`

### Customization

To modify retry behavior, update the configuration in `/src/lib/utils/retry.ts`:

```typescript
export const retryGoogleCalendarCall = <T>(
  fn: () => Promise<T>,
  operationName = 'Google Calendar API call'
): Promise<T> => {
  return retryWithBackoff(fn, {
    maxRetries: 5,        // Increase/decrease retry attempts
    baseDelay: 1000,      // Adjust initial delay
    maxDelay: 32000,      // Set maximum delay cap
    // ... other options
  });
};
```

## Best Practices

### 1. Operation Naming
Always provide descriptive operation names for better logging:
```typescript
await retryGoogleCalendarCall(
  () => calendar.events.insert(eventData),
  'Calendar event creation for user meeting'
);
```

### 2. Error Context
Include relevant context in error messages:
```typescript
console.error("Meet creation error:", {
  userId: session.user?.email,
  eventId: event.data.id,
  error: error.message
});
```

### 3. Client Feedback
Provide clear user feedback for rate limit scenarios:
- Explain the temporary nature of the issue
- Suggest appropriate wait times
- Offer alternative actions if available

## Testing

### Rate Limit Simulation

To test retry logic in development:

1. **Mock API Responses**: Simulate 429 responses in test environment
2. **Network Throttling**: Use browser dev tools to simulate slow connections
3. **Load Testing**: Generate concurrent requests to trigger rate limits

### Example Test Cases

```typescript
// Test successful retry after rate limit
it('should retry and succeed after rate limit error', async () => {
  // Mock first call to return 429, second to succeed
  // Assert retry logic works correctly
});

// Test retry exhaustion
it('should fail after max retries exceeded', async () => {
  // Mock all calls to return 429
  // Assert final error is thrown
});
```

## Troubleshooting

### Common Issues

1. **Persistent Rate Limits**
   - Check API quota in Google Cloud Console
   - Verify API keys are correctly configured
   - Consider implementing request queuing for high-volume scenarios

2. **Authentication Errors During Retry**
   - Ensure refresh token is valid
   - Check token expiry handling
   - Verify OAuth2 scopes include required permissions

3. **Network Timeouts**
   - Adjust timeout values in retry configuration
   - Check network connectivity
   - Consider implementing circuit breaker pattern for persistent failures

### Monitoring Recommendations

- Set up alerts for high retry rates
- Monitor API quota usage in Google Cloud Console
- Track error rates and patterns
- Log retry success/failure rates for optimization

## Future Enhancements

1. **Circuit Breaker Pattern**: Temporarily stop retrying after consecutive failures
2. **Request Queuing**: Queue requests during high-rate scenarios
3. **Adaptive Backoff**: Adjust retry timing based on API response headers
4. **Metrics Collection**: Detailed retry statistics and performance monitoring