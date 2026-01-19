# Change log

Please use this to capture reasoning behind changes:

## 1.1.1

Updated `dev` dependencies; no client-facing changes.

## 1.1.0

Introducing `PrisonerSchedulePermission.read_schedule` to match and replace the existing logic in the Prisoner Profile
for reading a prisoner's schedule. This permission requires the user to have the prisoner's prison in their caseload.

## 1.0.0

### Breaking changes:

* Renamed `PrisonerIncentivesPermission.read` to `PrisonerIncentivesPermission.read_incentive_level` to distinguish
  between reading just the incentive level vs the incentives history and comments. This only affected the Prisoner
  Profile contract tests.

### New features:

* Introduction of `PrisonerIncentivesPermission.read_incentive_level_history`.

  We reviewed the permissions around incentives and found that there were conflicting permissions between
  displaying the incentive level in the Prisoner Profile banner, the incentives card in the Prisoner Profile overview
  and the incentives service itself. Connect DPS and the Incentives team agreed that just reading the incentive level
  should follow the base checks for the profile, whilst reading the incentives history and comments should not
  be allowed for prisoners in a prison outside the user's caseload.

  We have therefore introduced a new permission to capture the incentive level history permission.

* Introduction of CSRA permissions for reading the CSRA rating of a prisoner and also the history and details of
  CSRA assessments.

  It was decided (see Slack #hmpps-data-domains on 17/11/25) that CSRA should sit in the 'Prisoner Specific Risks'
  domain, `as it is solely an assessment of their suitability to share a cell and who with`

  The permissions mirror the logic that was used in the Prisoner Profile.

* Introduction of a `PersonPrisonCategoryPermission.read` permission that matches the base checks. This matched the
  existing logic in the Prisoner Profile for reading a prisoner's category.

## 0.5.0

No functionality changes. Dependencies updated and support for node 24 has been added.

## 0.4.0

Access period for users with both the `POM` and `GLOBAL_SEARCH` roles to access prisoner case notes after a transfer
extended from 30 to 90 days.

## 0.3.0

Official release for updates to the Case Notes and Religion permissions.

**Case Notes Permissions:**

Previously if a user had both the `POM` and `GLOBAL_SEARCH` roles they would be able read/write case notes any prisoner.
The case notes permissions have now been updated so that users with both the `POM` and `GLOBAL_SEARCH` roles will only
be able to read/write a prisoner's case notes if the prisoner has been in the users establishment within the last 30
days.

The permissions check requires additional data to be passed in via the `Prisoner` which now expects the
`previousPrisonId` and `previousPrisonLeavingDate` fields to be present. This data has been added to the prisoner search
API so clients using the permissions library will need to ensure the following fields are present in the `Prisoner`
interface.

```
export default interface Prisoner {
  prisonerNumber: string
  prisonId?: string
  restrictedPatient: boolean
  supportingPrisonId?: string
  previousPrisonId?: string
  previousPrisonLeavingDate?: string
}
```

**Religion and Belief Permissions:**

The permissions check for `PersonProtectedCharacteristicsPermission.read_religion_and_belief` updated to only allow read
access to a prisoner's religion data to users who are part of the prisoner's caseload.

## 0.3.0-alpha.1

Alpha release to test changes to the case notes and religion permissions.

## 0.2.0

Incident response. We are introducing an additional role enabling staff to upload photos via DPS.

This is in addition to the existing sensitive edit role to allow rollout of the feature independently of Prisoner
Profile edit.

## 0.1.0

Additional personal relationships (contacts) permissions introduced to enable hmpps-contacts-ui to make use of the
library and for the Prisoner Profile and the Contacts UI to align on whether a user has access to a prisoner's
contacts.

Connect DPS and the Contacts team have agreed to allow contacts read permission for anyone with the prisoner's
prison in their caseload (rather than requiring an active caseload match as was initially implemented in the
Contacts UI). Contacts, restrictions and visit approval edits adopt the same role checks as were implemented
in the Contacts UI codebase.

We are keeping the divergence between the rules around editing Next of Kin and Emergency Contacts via the prisoner
profile for now to enable the Profile Edit and Contacts to role out to users independently, but we will aim to unify
these permissions once both rollouts are complete.

## 0.0.1

Initial release supporting the Prisoner Profile permissions.

## 0.0.1-alpha.1 to 0.0.1-alpha.15

Pre-releases used to incrementally replace the prisoner profile
permissions logic.
