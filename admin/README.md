# Admin Dashboard — TrendLama

The **admin dashboard** for the TrendLama e-commerce UI. A standalone **Next.js 15** (App Router) application that shows how a back-office would look: an analytics landing page plus sortable, paginated data tables for products, users and payments, with sheet-based forms for creating and editing records.

> This app is **UI-only**. There is no backend — every "row" is hard-coded inside an async `getData()` function and every form validates but does not submit. See the [root README](../README.md) for the full project overview and UML diagrams.

![Next.js](https://img.shields.io/badge/Next.js-15.3.0-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-new--york-000000)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [The 3-File Table Pattern](#the-3-file-table-pattern)
- [Sheet-Based Forms](#sheet-based-forms)
- [Charts & Dashboard Widgets](#charts--dashboard-widgets)
- [Theming & Shell](#theming--shell)
- [Data & the Mock Seam](#data--the-mock-seam)
- [Known Gaps](#known-gaps)

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js **15.3.0** (App Router, Turbopack) |
| UI library | React **19** |
| Language | TypeScript 5 |
| Styling | Tailwind CSS **v4** + `tw-animate-css` |
| Components | **shadcn/ui** (`new-york` style, Radix UI primitives) |
| Tables | **TanStack Table v8** |
| Charts | **Recharts** (wrapped by `components/ui/chart.tsx`) |
| Forms | **react-hook-form** + **Zod v3** (`@hookform/resolvers`) |
| Theming | `next-themes` (light / dark / system) |
| Dates | `date-fns` + `react-day-picker` |
| Icons | `lucide-react` |

---

## Getting Started

**Prerequisites:** [Node.js](https://nodejs.org) 20.19+ and [pnpm](https://pnpm.io).

```bash
cd admin
pnpm install
pnpm dev -- -p 3001
```

Open [http://localhost:3001](http://localhost:3001). The storefront (`client/`) runs on port 3000, so give this app a different port.

### Scripts

| Script | Command | Description |
|---|---|---|
| `pnpm dev` | `next dev --turbopack` | Start the dev server |
| `pnpm build` | `next build` | Production build |
| `pnpm start` | `next start` | Serve the production build |
| `pnpm lint` | `next lint` | Run ESLint (`next/core-web-vitals` + `next/typescript`) |

---

## Project Structure

```
admin/
├── components.json            # shadcn CLI config (new-york, neutral, aliases)
├── next.config.ts             # remotePatterns for images.pexels.com
├── public/
│   ├── logo.svg
│   ├── products/              # 1g.png … 8gr.png
│   └── users/                 # 1.png … 36.png
└── src/
    ├── app/
    │   ├── layout.tsx         # Theme > SidebarProvider > AppSidebar + <main>
    │   ├── page.tsx           # "/"               analytics dashboard
    │   ├── products/          # page.tsx + columns.tsx + data-table.tsx
    │   ├── users/             # page.tsx + columns.tsx + data-table.tsx
    │   │   └── [id]/page.tsx  # "/users/:id"       user profile
    │   └── payments/          # page.tsx + columns.tsx + data-table.tsx
    ├── components/
    │   ├── AppSidebar.tsx     # grouped navigation + add-record sheets
    │   ├── Navbar.tsx         # sidebar trigger, theme menu, user menu
    │   ├── TablePagination.tsx# exports DataTablePagination
    │   ├── AddProduct.tsx, AddCategory.tsx, AddUser.tsx, AddOrder.tsx, EditUser.tsx
    │   ├── AppBarChart.tsx, AppAreaChart.tsx, AppLineChart.tsx, AppPieChart.tsx
    │   ├── CardList.tsx, TodoList.tsx
    │   ├── ui/                # 24 shadcn/ui primitives
    │   └── providers/ThemeProvider.tsx
    ├── hooks/use-mobile.ts
    └── lib/utils.ts           # cn() helper
```

---

## Routes

| Route | File | Rendered as | Purpose |
|---|---|---|---|
| `/` | `src/app/page.tsx` | Server | Revenue bar chart, latest transactions, browser pie chart, todo list, visitors area chart, popular products |
| `/products` | `src/app/products/page.tsx` | Server | 8 products in a sortable/paginated table with row selection |
| `/users` | `src/app/users/page.tsx` | Server | 36 users in the same table pattern |
| `/users/[id]` | `src/app/users/[id]/page.tsx` | Server | User profile: breadcrumbs, badges, info card, edit sheet, activity line chart |
| `/payments` | `src/app/payments/page.tsx` | Server | 36 payments in the same table pattern |

---

## The 3-File Table Pattern

Every entity (`products/`, `users/`, `payments/`) repeats the same trio:

1. **`page.tsx`** *(server)* — an async `getData()` returns hard-coded rows and renders `<DataTable columns={columns} data={data} />`.
2. **`columns.tsx`** *(client)* — a declarative `ColumnDef[]`: selection checkbox, image/avatar cell, one sortable header (`Price`, `Email`, `Amount`), a status badge and an actions dropdown.
3. **`data-table.tsx`** *(client)* — a generic TanStack Table wrapper using `getCoreRowModel`, `getPaginationRowModel` and `getSortedRowModel`, plus `DataTablePagination`.

`DataTable` also renders a **"Delete &lt;Entity&gt;(s)"** button as soon as rows are selected — but the handler is intentionally unwired.

Adding a new table is mostly a matter of writing a `columns.tsx` and copying an existing `data-table.tsx`.

---

## Sheet-Based Forms

Create/edit flows open inside a Radix [`Sheet`](src/components/ui/sheet.tsx) instead of navigating to a separate page, which keeps the dashboard shell mounted:

| Component | Purpose |
|---|---|
| `AddProduct.tsx` | Name, descriptions, price, category, sizes/colors checkboxes, per-color image inputs |
| `AddCategory.tsx` | New category |
| `AddUser.tsx` | New user |
| `EditUser.tsx` | Edit an existing user (opened from `/users/[id]`) |
| `AddOrder.tsx` | New order / payment |

All of them are built with `react-hook-form` + a Zod schema and render shadcn `Form` fields with `FormMessage` errors. **Validation is complete; no `onSubmit` handler is attached**, so submitting is a no-op.

---

## Charts & Dashboard Widgets

- `AppBarChart`, `AppAreaChart`, `AppLineChart`, `AppPieChart` are `"use client"` components built on Recharts through the shadcn `ui/chart.tsx` wrapper (they read colors from the active theme's CSS variables).
- `CardList.tsx` renders a small list of products/transactions; `TodoList.tsx` combines a `Popover` + `Calendar` (react-day-picker) date picker with a `ScrollArea` list.

---

## Theming & Shell

`src/app/layout.tsx` composes the shell:

```
ThemeProvider (next-themes, attribute="class", system)
└── SidebarProvider (defaultOpen read from the "sidebar_state" cookie)
    ├── AppSidebar        # grouped nav + Sheets
    └── <main>
        ├── Navbar        # SidebarTrigger, theme dropdown, user dropdown
        └── {children}
```

The theme toggle in `Navbar.tsx` switches between light, dark and system, and `AppSidebar` collapses to an icon rail (`collapsible="icon"`).

---

## Data & the Mock Seam

Nothing is fetched. Each page's `getData()` returns an in-file array, and dashboard widgets hold their own `chartData`/mock lists. This is the seam where a real API plugs in: replace the body of `getData()` (or the chart constants) with a fetch call and the presentational layer stays unchanged.

`next.config.ts` whitelists `images.pexels.com` for `next/image`. The GitHub avatars used in `Navbar`/user pages render through Radix `Avatar` (a plain `<img>`), so they are not affected by that config.

---

## Known Gaps

Objective gaps in the current code — good starting points for contributions:

| # | Issue | Location |
|---|---|---|
| 1 | `"View customer"` action on products links to `/products/:id`, but no such route exists | `src/app/products/columns.tsx:110` |
| 2 | Sidebar "See All Transactions" points to `/users` instead of `/payments` | `src/components/AppSidebar.tsx:199` |
| 3 | Sidebar entries `Inbox`, `Calendar`, `Search`, `Settings`, and all `Add *` links point to `#` | `src/components/AppSidebar.tsx` |
| 4 | "Delete &lt;Entity&gt;(s)" buttons appear on row selection but have no handler | `src/app/*/data-table.tsx` |
| 5 | Leftover `console.log(rowSelection)` in the payments table | `src/app/payments/data-table.tsx:51` |
| 6 | The "Inbox" sidebar badge is hard-coded to `24` | `src/components/AppSidebar.tsx:102` |
| 7 | Form submit handlers are unwired (validation only) | `src/components/Add*.tsx`, `EditUser.tsx` |
| 8 | `/users/[id]` renders static "John Doe" data regardless of the `id` param | `src/app/users/[id]/page.tsx` |
| 9 | Product mock data is duplicated between `products/page.tsx` and `CardList.tsx` | see files |
| 10 | No tests and no CI | repo-wide |

---

## Related

- [Root README](../README.md) — project overview, architecture patterns and UML diagrams.
- [`client/`](../client/README.md) — the customer storefront.
