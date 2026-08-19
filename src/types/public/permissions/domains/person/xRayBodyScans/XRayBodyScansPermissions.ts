export enum XRayBodyScansPermission {
  read_scans = 'prisoner:x-ray-body-scans:read',
  edit_scans = 'prisoner:x-ray-body-scans:edit',
}

export type XRayBodyScansPermissions = Record<XRayBodyScansPermission, boolean>
