import { ApiConfig } from '@ministryofjustice/hmpps-rest-client'
import { TelemetryClient } from 'applicationinsights'
import type bunyan from 'bunyan'

export default interface PermissionsOptions {
  prisonApiConfig: ApiConfig
  prisonerSearchConfig: ApiConfig
  logger?: bunyan | typeof console
  telemetryClient?: TelemetryClient
}
