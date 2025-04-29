import { PrisonerPermission } from '../permissions/prisoner/PrisonerPermissions'

export default class PrisonerPermissionError extends Error {
  public status = 403

  public failedPermissionChecks: PrisonerPermission[]

  constructor(message = 'Access not permitted', failedPermissionChecks: PrisonerPermission[] = []) {
    super(message)
    this.name = 'NotFoundError'
    this.failedPermissionChecks = failedPermissionChecks
  }
}
