// Types only:
export type { default as PermissionsOptions } from './types/permissions/PermissionsOptions'
export type { PrisonerPermission } from './types/permissions/prisoner/PrisonerPermissions'

// Service layer:
export { default as PermissionsService } from './services/permissions/PermissionsService'

// Middleware:
export { default as prisonerPermissionsGuard } from './middleware/PrisonerPermissionsGuard'

// Permissions:
export { checkPrisonerAccess, PrisonerBasePermission } from './types/permissions/prisoner/PrisonerPermissions'

// Errors:
export { default as HmppsPermissionsError } from './types/errors/PrisonerPermissionError'
