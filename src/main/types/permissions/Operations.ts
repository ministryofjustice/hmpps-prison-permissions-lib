export enum Operation {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
}

export interface Operations {
  [Operation.create]?: boolean
  [Operation.read]?: boolean
  [Operation.update]?: boolean
  [Operation.delete]?: boolean
}

export function noAccess() {
  return {}
}
