export enum CaseNotesPermission {
  read = 'prisoner:case-notes:read',
  edit = 'prisoner:case-notes:edit',
  read_sensitive = 'prisoner:case-notes:sensitive:read',
  delete_sensitive = 'prisoner:case-notes:sensitive:delete',
  edit_sensitive = 'prisoner:case-notes:sensitive:edit',
}

export type CaseNotesPermissions = Record<CaseNotesPermission, boolean>
