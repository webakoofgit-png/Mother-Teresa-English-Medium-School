# Page components

This directory contains the Home, About and Principal page components. Public modules, login and portals are reused from `src/components/`.

Declare URL paths in `src/app-routes.ts`; `src/App.tsx` maps them to page components through React Router. Register dynamic paths with `:id`. `src/main.tsx` installs BrowserRouter and reduced-motion support. Document metadata and fonts start in `index.html`.

There is no generated route tree or file-routing plugin. New page files must be registered explicitly.
