# Mother Teresa English Medium School

A public school website, student portal and administration dashboard for Mother Teresa English Medium School, Malwadi (Masur), Karad, Satara, managed by Shree Dhanlaxmi Foundation, Karad.

Built with TanStack Start, TypeScript, React and Tailwind CSS. The logo-derived maroon, gold, green and ivory theme preserves the supplied official artwork.

The frontend demo includes class-specific homework, fees and receipts, attendance, timetables, results, notices, admissions and editable website content. Student downloads generate branded PDF documents with both official logos. Demo records persist in browser storage and can be reset in Admin Settings.

## Demo access

Run `npm install`, then `npm run dev`, and open the URL printed by Vite. Visit `/login` to enter the admin demo or select a fictional student. No password is required. Demo role checks are not secure authentication; real authentication, APIs and payment processing require a backend. Do not enter real personal information.

The project uses a local `.npm-cache` directory to avoid filling the system-drive npm cache. Generated files, dependencies, caches and environment secrets are excluded from Git.

## Validation

```sh
npm run build
npx vitest run --config vitest.pdf.config.ts
```

The PDF test suite covers document generation, original logos, pagination, payment calculations and student-specific data. See `DEMO.md` for the wider demo and verification notes.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d20c41bd-35e9-4a70-b823-c73597ba7640).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone https://github.com/webakoofgit-png/Mother-Teresa-English-Medium-School.git
cd Mother-Teresa-English-Medium-School
npm i
npm run dev
```
