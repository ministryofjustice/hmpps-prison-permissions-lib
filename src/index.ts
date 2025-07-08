// Service layer:
export { default as PermissionsService } from './services/permissions/PermissionsService'

// Middleware:
export { default as prisonerPermissionsGuard } from './middleware/PrisonerPermissionsGuard'

// View:
export { default as setupNunjucksPermissions } from './view/SetupNunjucksPermissions'
