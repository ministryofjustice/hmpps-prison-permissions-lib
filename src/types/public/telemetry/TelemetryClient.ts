export interface TelemetryClient {
  trackEvent(name: string, attributes?: Record<string, string | number | boolean>): void
}
