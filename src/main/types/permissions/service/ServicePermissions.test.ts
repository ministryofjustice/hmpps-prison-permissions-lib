import { ServicePermission, servicePermission, ServicePermissions } from './ServicePermissions'
import { GlobalSearchServicePermission } from './GlobalSearchServicePermissions'

describe('Service Permissions', () => {
  const servicePermissions = (allTrue: boolean): ServicePermissions => {
    return {
      services: {
        globalSearch: {
          'service:global-search:perform-search': allTrue,
        },
      },
    }
  }

  it.each([
    [GlobalSearchServicePermission.perform_search, true],
    [GlobalSearchServicePermission.perform_search, false],
  ])('Can check Global Search permission: %s is %s', (permission: ServicePermission, allTrue: boolean) => {
    expect(servicePermission(permission, servicePermissions(allTrue))).toBe(allTrue)
  })
})
