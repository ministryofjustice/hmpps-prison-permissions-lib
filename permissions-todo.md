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



