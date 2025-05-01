import { PrisonerPermission } from '../permissions/prisoner/PrisonerPermissions'

export default class PrisonerPermissionError extends Error {
  public status = 403

  public deniedPermissionChecks: PrisonerPermission[]

  constructor(message = 'Access not permitted', failedPermissionChecks: PrisonerPermission[] = []) {
    super(message)
    this.name = 'NotFoundError'
    this.deniedPermissionChecks = failedPermissionChecks
  }
}
