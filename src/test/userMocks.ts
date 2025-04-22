import { PrisonUser } from '../main/types/user/HmppsUser'
import CaseLoad from '../main/types/user/CaseLoad'

export const prisonUserMock: PrisonUser = {
  authSource: 'nomis',
  username: 'PRISON_USER_MOCK',
  userId: '1A',
  staffId: 1111,
  name: 'JOHN SMITH',
  displayName: 'John Smith',
  caseLoads: [{ caseLoadId: 'MDI', currentlyActive: true } as CaseLoad],
  activeCaseLoadId: 'MDI',
  userRoles: [],
  keyWorkerAtPrisons: {},
}

export const userMDI = { ...prisonUserMock, username: 'USER_MDI' }
export const userLEI = {
  ...prisonUserMock,
  username: 'USER_LEI',
  activeCaseLoadId: 'LEI',
  caseLoads: [{ caseLoadId: 'LEI', currentlyActive: true } as CaseLoad],
}
