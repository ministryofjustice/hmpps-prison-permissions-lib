# Change log

Please use this to capture reasoning behind changes:

## 1.0.0

This release changes the permissions around global access to case notes and read access to religion data.

**Case Notes Permissions:**

Previously if a user had both the `POM` and `GLOBAL_SEARCH` roles they would be able read/write case notes any prisoner. The case notes permissions have now been updated so that users with both the `POM` and `GLOBAL_SEARCH` roles will only be able to read/write a prisoner's case notes if the prisoner has been in the users establishment within the last 30 days.

The permissions check requires additional data to be passed in via the `Prisoner` which now expects the `previousPrisonId` and `previousPrisonLeavingDate` fields to be present. This data is being added to the prisoner search so clients using the permissions library will need to ensure the following fields are present.

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

The permissions check for `PersonProtectedCharacteristicsPermission.read_religion_and_belief` updated to only allow read access to a
prisoner's religion data to users who are part of the prisoner's caseload.

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
