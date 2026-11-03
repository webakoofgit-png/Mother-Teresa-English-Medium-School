# Mother Teresa school frontend demo

Run `npm install` and `npm run dev`. The project `.npmrc` stores the npm cache in `.npm-cache` on the project drive to avoid filling the system drive. The cache is ignored by Git.

Open the URL printed by Vite, then visit `/login`. Choose **Enter admin demo**, or select a fictional student and choose **Enter student demo**. No password is required. This is frontend demonstration access, not production authentication.

The three sample learners represent Nursery, Standard 7 and Standard 11. Homework and timetables match class and division; results and fee records match student IDs. Publish homework, record a demo offline payment, or save attendance in the admin portal, then select the corresponding learner to inspect the shared updates. Public admission and contact forms save enquiries to the same repository. Public notices respect audience and publication status. Gallery and editorial changes use shared demo state.

All data is fictional. Changes persist in this browser, including demo role selection. Admin Settings can reset the workspace and sign out. Cross-tab storage events refresh the shared snapshot. Use fictional details only. No payments, emails or backend requests are sent.

Editable institutional details remain unverified placeholders. Photos are illustrative. Official logos are used through their original CDN pointers.

## Verification status

The project now uses React, Vite and React Router, with no framework router or server-rendering dependency. The production build passes and all 83 tests pass, covering route coverage, both demo logins, role redirects, learner profiles, public notice details, shared data and branded PDFs.

Strict TypeScript checking previously reported errors in the existing generic demo record models; that separate check is not part of the successful Vite build. Browser visual QA remains separate from the automated route and data tests.
