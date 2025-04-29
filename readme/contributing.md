[< Back](../README.md)
---

## Contributing

At this early stage, please discuss with [#connect-dps-devs](https://moj.enterprise.slack.com/archives/C04JFG3QJE6) in
the first instance.

We are trialling out grouping permissions by domain where possible (following the 'HMPPS Domains' Miro diagram). This is
to avoid one big unwieldy collection of permissions at the top level of the permissions object.

Adding a new permission involves the following:

1) Finding the appropriate domain (or creating a new one)
2) Add the permission to the relevant domain enum
3) Add the permission to the relevant domain interface
4) Add a check to [PrisonerPermissions.test.ts](../src/types/permissions/prisoner/PrisonerPermissions.test.ts)
   to ensure the permission can be checked using the tooling.
5) Add a folder under `src/services/permissions/domains/...` for the new permission check. This should include the
   check, a unit test and a scenarios file. The scenarios can be built up with the builders and help to verify
   the end-to-end permission check works ok.
6) Using the above scenarios for the permission, add a test
   to [PermissionsService.test.ts](../src/services/permissions/PermissionsService.test.ts)
7) Add a test to [PrisonerPermissionsGuard.test.ts](../src/middleware/PrisonerPermissionsGuard.test.ts) to verify
   that the permissions guard will prevent access to an endpoint if a route is dependent on the new permission and that
   permission is denied for the user.
8) Consider adding to a service's [contract tests](../src/contractTests) if the service is to start making use of the
   new permission.
