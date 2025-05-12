## Overview permissions

---
accessCode = baseCheck ✅

---
courtCases.view = prisoner:person-sentence-calculation:read ✅

this is badly named in prisoner profile - more to do with whether user can access calculate release dates...

drives whether the panel at the top of the overview with release date calculation and link is
shown:  https://github.com/ministryofjustice/hmpps-prisoner-profile/blob/main/server/controllers/overviewController.ts#L67

---
courtCases.edit = prisoner:person-sentence-calculation:adjustments:edit ✅

this is again badly named in prisoner profile - actually whether a user can make adjustments - drives what the link
in the release date calculation block
shows.https://github.com/ministryofjustice/hmpps-prisoner-profile/blob/main/server/controllers/utils/overviewController/mapCourtCaseSummary.ts#L22

---

money.view = prisoner:prisoner-money:read ✅

---

adjudications.view = prisoner:prisoner-adjudications:read ✅

---

visits.view = prisoner:prisoner-visits-and-visitors:read ✅

---

incentives.view = prisoner:prisoner-incentives:read ✅

---

category.edit = prisoner:person-prison-category:edit

---

calculateReleaseDates.edit = prisoner:person-sentence-calculation:read ✅ (same as courtCases.view above)

---

Case notes permissions are a bit of a mess, here's the summary:

roleHelpers.ts - canViewCaseNotes
-> drives which tabs are shown in the profile
-> not in step with what the permissions guard is checking
-> hopefully this will get replaced at some point with prisoner:case-notes:read ✅

roleHelpers.ts - canAddCaseNotes
-> drives whether the 'Add case note' button is visible
-> not in step with what the permissions guard is checking
-> hopefully this will get replaced at some point with prisoner:case-notes:edit ✅

caseNotes.edit
-> drives whether the 'Add case note' action link is shown
-> not in step with what the permissions guard is checking
-> hopefully this will get replaced at some point with prisoner:case-notes:edit ✅

getCaseNotesAccessStatusCode = prisoner:case-notes:read ✅

---

keyworker.edit ❌

This shouldn't be a permission - this just drives an action link on the overview to create a keyworker session case note
but anyone can do this if they can add a case note for a prisoner. Need to rip out the keyworker check from this
library.

---

appointment.edit = prisoner:appointment:edit ✅

---

useOfForce.edit = prisoner:use-of-force:edit ✅

---

activity.edit = prisoner:activity:edit


