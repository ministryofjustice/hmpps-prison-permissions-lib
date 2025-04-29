## Overview permissions

---
accessCode = baseCheck ✅

---
courtCases.view = prisoner:person-sentence-calculation:read ✅

this is badly named in prisoner profile - more to do with whether user can access calculate release dates...

drives whether the panel at the top of the overview with release date calculation and link is
shown:  https://github.com/ministryofjustice/hmpps-prisoner-profile/blob/main/server/controllers/overviewController.ts#L67

---
courtCases.edit =
