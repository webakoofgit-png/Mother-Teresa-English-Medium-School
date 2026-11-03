# Mother Teresa school frontend demo

Run `npm install` and `npm run dev`. The project `.npmrc` stores the npm cache in `.npm-cache` on the project drive to avoid filling the system drive. The cache is ignored by Git.

Open the URL printed by Vite, then visit `/login`. Choose **Enter admin demo**, or select a fictional student and choose **Enter student demo**. No password is required. This is frontend demonstration access, not production authentication.

The three sample learners represent Nursery, Standard 7 and Standard 11. Homework and timetables match class and division; results and fee records match student IDs. Publish homework, record a demo offline payment, or save attendance in the admin portal, then select the corresponding learner to inspect the shared updates. Public admission and contact forms save enquiries to the same repository. Public notices respect audience and publication status. Gallery and editorial changes use shared demo state.

All data is fictional. Changes persist in this browser, including demo role selection. Admin Settings can reset the workspace and sign out. Cross-tab storage events refresh the shared snapshot. Use fictional details only. No payments, emails or backend requests are sent.

Editable institutional details remain unverified placeholders. Photos are illustrative. Official logos are used through their original CDN pointers.

## Verification status

The development server was started, and `/`, `/login`, `/admin/dashboard` and `/student/dashboard` returned HTTP 200. Automated regression tests were added for route coverage, class-specific homework, payment balance calculations, attendance updates, notice audiences and reset behavior.

Full verification remains pending: the system drive ran out of space during installation; installation subsequently succeeded using the project-drive cache. The test runner later failed to launch with a Windows system-resource error. Strict TypeScript checking identified errors that still require correction. No successful production build or browser interaction audit has been confirmed.
