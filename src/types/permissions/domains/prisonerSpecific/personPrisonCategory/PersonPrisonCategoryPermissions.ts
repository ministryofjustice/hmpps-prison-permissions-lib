export enum PersonPrisonCategoryPermission {
  edit = 'prisoner:person-prison-category:edit',
}

export interface PersonPrisonCategoryPermissions {
  [PersonPrisonCategoryPermission.edit]: boolean
}
