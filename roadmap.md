# Roadmap — Mother Teresa English Medium School website

## Implementation update

Public routes, the student portal, the admin workspace, the shared browser repository and regression test sources have been implemented. This roadmap records the original stages; the React Router migration is verified by a production build and 83 passing tests. See DEMO.md for access and known validation limits.

## Stage 1 — Design system, header/footer, homepage (this build)
- [x] Logo cleanup (school badge + foundation logo, transparent PNG assets)
- [x] Favicon from school logo
- [x] Design system in src/styles.css (navy/teal/yellow/coral palette, Plus Jakarta Sans + DM Sans)
- [x] Site content data layer (src/data/site.ts — editable copy)
- [x] Global header (info strip, dropdown nav, sticky compact, mobile menu)
- [x] Premium footer
- [x] Homepage with all 14 sections
- [x] Core public pages: About, Principal's Message, Foundation, Academics, Admissions, Facilities, Events, Achievements, Notices, Contact, Login

## Stage 2 — Remaining public pages
- [ ] Academics subpages: /academics/pre-primary, /academics/primary-secondary, /academics/higher-secondary
- [ ] Gallery with masonry grid, category filters, lightbox
- [ ] Event detail pages (/events/:id)
- [ ] Notice detail pages (/notices/:id) + PDF download placeholders
- [ ] Downloads page (forms, circulars, calendar)
- [ ] Real school photography to replace generated placeholder imagery
- [ ] Google Maps integration (needs real school location/marker)

## Stage 3 — Student portal demo (/student/*)
- [ ] Demo login with student selector (pre-primary / middle / higher-secondary)
- [ ] Dashboard overview, profile, homework, fees, attendance, timetable, exams & results, notices, study materials, calendar, settings

## Stage 4 — Admin dashboard demo (/admin/*)
- [ ] Overview with Recharts analytics
- [ ] Students, admission enquiries, classes, teachers management
- [ ] Homework, fees, attendance, timetable, exams, results, notices management
- [ ] Website content CMS, gallery, foundation content
- [ ] Reports & analytics, settings, reset demo data

## Stage 5 — Shared demo data & cross-dashboard sync
- [ ] Central mock repository + localStorage persistence
- [ ] Admin-published homework/fees/attendance/results/notices reflect in student portal
- [ ] Demo role routing guards

## Stage 6 — Polish
- [ ] Responsive QA at 320–1920px
- [ ] Accessibility review
- [ ] Performance pass
- [ ] Replace all placeholder contact details with real ones (phone, email, social links)
