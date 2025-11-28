export enum PersonPrisonCategoryPermission {
  read = 'prisoner:person-prison-category:read',
  edit = 'prisoner:person-prison-category:edit',
}

export type PersonPrisonCategoryPermissions = Record<PersonPrisonCategoryPermission, boolean>
