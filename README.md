# hmpps-prison-permissions-lib

[![repo standards badge](https://img.shields.io/badge/endpoint.svg?&style=flat&logo=github&url=https%3A%2F%2Foperations-engineering-reports.cloud-platform.service.justice.gov.uk%2Fapi%2Fv1%2Fcompliant_public_repositories%2Fhmpps-prison-permissions-lib)](https://operations-engineering-reports.cloud-platform.service.justice.gov.uk/public-report/hmpps-prison-permissions-lib "Link to report")

A Node.js client library to centralise the process of determining user permissions for prison services and data.

We welcome feedback on this library and README [here](https://moj.enterprise.slack.com/archives/C04JFG3QJE6)
in order to improve it.

## Table of Contents

1. [Introduction](#introduction)
2. [What checks are made?](#what-checks-are-made)
3. [Where does the data come from?](#where-does-the-data-come-from)
4. [How do I implement this library?](#how-do-i-implement-this-library)
5. [For library developers](#for-library-developers)

## Introduction

Determining whether a user has access to a particular resource (e.g. a service, or prisoner data) consists of a
number of checks and is not necessarily just determined by what roles a user has been assigned.

This permissions library aims to share the logic centrally so that all services agree on what a user should and
should not be able to access. It is used by the prisoner profile to determine if a user can access certain parts
of the prisoner's profile for example.

## What checks are made?

The permissions use a variety of checks, based on:

* The user's DPS roles
* The user's case load list (and active case load)
* The prisoner's location (which prison they are at, or whether they are transferring or out of prison)
* The prisoner's restricted patient status

## Where does the data come from?

We do not yet have a centralised permissions service, so this library requires some input data to determine
the user permissions.

We expect that the user's roles and case loads are already available at:

* `res.locals.user.userRoles`,
* `res.locals.user.caseLoads`,
* `res.locals.user.activeCaseLoad`,
* `res.locals.user.activeCaseLoadId`,

User roles are already part of the Typescript Template
project [here](https://github.com/ministryofjustice/hmpps-template-typescript/blob/main/server/middleware/setUpCurrentUser.ts#L26)
and the retrieval of case load data is available
in [hmpps-connect-dps-components](https://github.com/ministryofjustice/hmpps-connect-dps-components?tab=readme-ov-file#populating-reslocalsuser-with-the-shared-case-load-data)
middleware.

The library will retrieve data about a prisoner
from [hmpps-prisoner-search](https://github.com/ministryofjustice/hmpps-prisoner-search)
and store it at `req.middleware.prisonerData` if it is not already provided there.

## How do I implement this library?

#### 1. Install the library

```shell
npm install @ministryofjustice/hmpps-prison-permissions-lib
```

#### 2. Create the PermissionsService

The permissions service should be created just like any other of your services. It requires the following:

* `prisonerSearchConfig`: [Prisoner Search](https://github.com/ministryofjustice/hmpps-prisoner-search) configuration
  conforming to the `hmpps-typescript-lib`'
  s
  `ApiConfig` [interface](https://github.com/ministryofjustice/hmpps-typescript-lib/blob/main/packages/rest-client/src/main/types/ApiConfig.ts)
* `authenticationClient`: An `AuthenticationClient` instance (
  see [hmpps-typescript-lib](https://github.com/ministryofjustice/hmpps-typescript-lib/blob/main/packages/auth-clients/src/main/AuthenticationClient.ts))
  in order to make authorized client credentials calls to Prisoner Search.
* `logger`: Bunyan logger for logging permissions events. Defaults to using `console`.
* `telemetryClient`: Optional but recommended. Instead of just logging permissions events, this provides richer metadata
  to Application Insights.

e.g.

```typescript
import { PermissionsService } from '@ministryofjustice/hmpps-prison-permissions-lib'

...

const prisonPermissionsService = PermissionsService.create({
  prisonerSearchConfig: config.apis.prisonerSearchApi,
  authenticationClient: new AuthenticationClient(config.apis.hmppsAuth, logger, tokenStore),
  logger,
  telemetryClient,
})
```

#### 3. Ensure your client has the role `ROLE_VIEW_PRISONER_DATA`...

...in order to be able to successfully call Prisoner
Search ([see Swagger docs](https://prisoner-search-dev.prison.service.justice.gov.uk/swagger-ui/index.html)).

#### 4. Add the `prisonerPermissionsGuard` middleware to your service's routes:

e.g.

```typescript
import { PrisonerBasePermission, prisonerPermissionsGuard } from '@ministryofjustice/hmpps-prison-permissions-lib'

...

get(
  `prisoner/{prisonerNumber}/somepage`,
  ...
    prisonerPermissionsGuard(permissionsService, { requestDependentOn: [PrisonerBasePermission.read] }),
  async (req, res, next) => {
  ...
```

#### 5. Ensure you handle 403s as required

If the user does not have the required permissions listed in `requestDependentOn`, then the middleware will
throw a `PrisonerPermissionError` with a status code of 403. The Typescript Template by default logs the user
out when encountering an error status of 403,
see [here](https://github.com/ministryofjustice/hmpps-template-typescript/blob/main/server/errorHandler.ts#L9).

#### 6. Make use of the permissions checking utility in your code

You can check if a particular permission is granted in your code simply by using the isGranted method, for example:

```js
isGranted(PrisonerMoneyPermission.read, res.locals.prisonerPermissions)
```

#### 7. Make use of the permissions checking utility directly in your nunjucks templates

You also can check permissions directly in nunjucks templates by:

* Configuring the nunjucks environment in your `nunjucksSetup.ts` file or equivalent:

```js
// Enable permissions checking in templates:
setupNunjucksPermissions(njkEnv)
```

* Using the permissions check in the template, for example:

```
{% if isGranted(PrisonerMoneyPermission.read, res.locals.prisonerPermissions) %}
 ...
{% endif %}
```

## For library developers:

1. [Publishing to NPM](readme/publishing.md)
2. [Contributing to permissions](readme/contributing.md)
