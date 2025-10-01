[< Back](../README.md)
---

## Mocking permissions

In order to test your application with this permissions library in unit tests, we've found it's better
to mock the library `isGranted` method as follows.

1/ Create a `mockPermissions.ts` file and include:

```typescript
import { isGranted, PrisonerPermission } from '@ministryofjustice/hmpps-prison-permissions-lib'

export default function mockPermissions(permissions: Partial<Record<PrisonerPermission, boolean>>) {
  const isGrantedMock = isGranted as jest.MockedFunction<typeof isGranted>

  isGrantedMock.mockImplementation((perm, _perms) => permissions[perm] || false)
}
```

2/ In the test where you want to mock the permissions, use `jest.mock` to declare that you're mocking the library:

```typescript
jest.mock('@ministryofjustice/hmpps-prison-permissions-lib')
```

3/ You can now mock permissions in your tests by:

```typescript
    mockPermissions({ [Permission.read_contacts]: true, [Permission.edit_contacts]: false })
```

## Mocking more of the library

If your tests spin up the whole application and you want to mock more of the library, you'll need to include a bit more
in your `mockPermissions.ts` file, and pass in the Express `app` as a parameter:

```typescript
import {
  isGranted,
  PersonalRelationshipsPermission,
  PrisonerPermission,
  prisonerPermissionsGuard,
  setupNunjucksPermissions,
} from '@ministryofjustice/hmpps-prison-permissions-lib'
import { Express } from 'express'
import nunjucksSetup from '../../utils/nunjucksSetup'

export default function mockPermissions(app: Express, permissions: Partial<Record<PrisonerPermission, boolean>>) {
  const isGrantedMock = isGranted as jest.MockedFunction<typeof isGranted>
  const prisonerPermissionsGuardMock = prisonerPermissionsGuard as jest.MockedFunction<typeof prisonerPermissionsGuard>
  const setupNunjucksPermissionsMock = setupNunjucksPermissions as jest.MockedFunction<typeof setupNunjucksPermissions>

  isGrantedMock.mockImplementation((perm, _perms) => permissions[perm] || false)
  setupNunjucksPermissionsMock.mockImplementation(njkEnv => {
    njkEnv.addGlobal('isGranted', isGrantedMock)
    Object.entries({ PersonalRelationshipsPermission }).forEach(([key, value]) => njkEnv.addGlobal(key, value))
  })
  prisonerPermissionsGuardMock.mockImplementation((_service, options) => async (_req, _res, next) => {
    return options.requestDependentOn.some(perm => !permissions[perm]) ? next(new Error('Permission denied')) : next()
  })

  // Need to reset the isGranted method in templates:
  nunjucksSetup(app)
}
```
