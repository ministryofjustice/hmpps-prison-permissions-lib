# Change log

Please use this to capture reasoning behind changes:

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
