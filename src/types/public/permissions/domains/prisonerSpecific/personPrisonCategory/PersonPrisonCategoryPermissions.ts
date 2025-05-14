export enum PersonPrisonCategoryPermission {
  edit = 'prisoner:person-prison-category:edit',
}

export type PersonPrisonCategoryPermissions = Record<PersonPrisonCategoryPermission, boolean>
