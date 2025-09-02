Goals

Recreate the Customers screen from provided design with correct layout, styles, and interactions.

Build a maintainable, modular, and testable React app in TypeScript.

Use mock data but keep the data layer structured so it can easily switch to a real backend API.

Provide a small design system in Storybook for consistent UI building blocks.

Non-Goals

No need to implement authentication, routing, or API integration beyond mocks.

No need to cover the other pages (Dashboard, Product, etc.) — sidebar items are static.

Not building a complete CRM, just the Customers screen.

Tech Stack

React + TypeScript — core framework and type safety.

Parcel — bundler (zero-config, fast).

Tailwind CSS (or custom CSS modules, depending on reviewer’s preference) — styling.

Storybook — isolated UI component library.

Lucide React — for icons.

Jest / React Testing Library (optional) — unit tests if time permits.

Design System

Encapsulated reusable components (Button, Card, Table, SidebarItem, StatCard, Badge).

Shown in Storybook for quick iteration.

Utility-first styling (Tailwind) for rapid prototyping.

Data Layer

Mock strategy:

Base set of sample customers in data/customers.mock.ts.

Utility (generateCustomers) expands dataset to hundreds of rows for pagination/sorting demo.

Sorting: by newest (createdAt), by name (A-Z), by status (Active > Inactive).

Filtering: client-side string match across name, company, and email.

Pagination: client-side with page size = 8.

Error/Loading/Empty states: handled at table level with simple conditional rendering.

Switching to API: Replace mock data provider with customerService using fetch/axios without changing UI components.

Error Handling

Graceful fallback UIs (Loading…, No customers found, Error loading data).

Non-fatal errors do not break the page — table area shows state.
