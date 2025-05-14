[< Back](../README.md)
---

## Contributing

At this early stage, please discuss with [#connect-dps-devs](https://moj.enterprise.slack.com/archives/C04JFG3QJE6) in
the first instance.

We are trialling out grouping permissions by domain where possible (following the 'HMPPS Domains' Miro diagram). This is
to avoid one big unwieldy collection of permissions at the top level of the permissions object.

Adding a new permission involves the following:

1) Finding the appropriate domain (or creating a new one) in `src/types/public/permissions/domains/...`
2) Add the permission to the relevant domain enum,
   e.g. [PrisonerMoneyPermissions.ts](../src/types/public/permissions/domains/prisonerSpecific/prisonerMoney/PrisonerMoneyPermissions.ts)
3) Add the permission path to the relevant path object,
   e.g. [PrisonerMoneyPermissionPaths.ts](../src/types/public/permissions/domains/prisonerSpecific/prisonerMoney/PrisonerMoneyPermissionPaths.ts)
4) Add a folder under `src/services/permissions/domains/...` for the new permission check. This should include the
   check, a unit test and a scenarios file. The scenarios can be built up with the builders and help to verify
   the end-to-end permission check works ok.
5) Using the above scenarios for the permission, add a test
   to [PermissionsService.test.ts](../src/services/permissions/PermissionsService.test.ts)
6) Consider adding to a service's [contract tests](../src/contractTests) if the service is to start making use of the
   new permission.
