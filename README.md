# E-Commerce UI — TrendLama

A **UI-only e-commerce prototype** built as two independent **Next.js 15** applications: a customer **storefront** (`client/`) and an **admin dashboard** (`admin/`). The repository ships with zero backend — all data is mocked in-file (marked `// TEMPORARY`), making it a clean foundation for learning Next.js App Router patterns or wiring up a real API.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-managed-F69220?logo=pnpm&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Client Storefront](#client-storefront)
- [Admin Dashboard](#admin-dashboard)
- [UML Diagrams](#uml-diagrams)
  - [1. Use Case Diagrams](#1-use-case-diagrams)
  - [2. Component Diagram](#2-component-diagram)
  - [3. Class Diagrams](#3-class-diagrams)
  - [4. Sequence Diagrams](#4-sequence-diagrams)
  - [5. Deployment Diagram](#5-deployment-diagram)
- [Architecture Patterns](#architecture-patterns)
- [Known Gaps & Good First Issues](#known-gaps--good-first-issues)
- [Contributing](#contributing)

---

## Overview

| | |
|---|---|
| **What** | Two front-end apps: a shop where customers browse products and check out, and a dashboard where admins inspect products, users, payments and analytics. |
| **How** | Each app is a standalone Next.js App Router project with its own `package.json`, lockfile and dev server. |
| **Data** | Fully mocked in component/page files — no `fetch`, no database, no API routes. The seam where a real API plugs in is explicitly marked in the code. |
| **Persistence** | Only the shopping cart persists, via Zustand `persist` → `localStorage`. |

**Client features** — category browsing, sort filter, product detail with size/color/quantity selection, persistent cart with badge count, and a 3-step checkout (cart → shipping → payment) with Zod-validated forms.

**Admin features** — analytics dashboard (bar/area/line/pie charts), sortable/paginated tables for products, users and payments with row selection, a single-user profile page, and side-sheet forms for adding products, categories, users and orders, plus light/dark/system theming.

---

## Tech Stack

| Concern | `client/` (Storefront) | `admin/` (Dashboard) |
|---|---|---|
| Framework | Next.js **15.4.5** (App Router, Turbopack) | Next.js **15.3.0** (App Router, Turbopack) |
| UI library | React **19.1** | React **19** |
| Language | TypeScript 5 | TypeScript 5 |
| Styling | Tailwind CSS **v4** | Tailwind CSS **v4** + `tw-animate-css` |
| Components | Hand-rolled components | **shadcn/ui** (new-york, Radix primitives) |
| State | **Zustand** + `persist` (localStorage) | React state + shadcn contexts |
| Tables | — | **TanStack Table v8** |
| Charts | — | **Recharts** (wrapped by shadcn `chart.tsx`) |
| Forms | **react-hook-form** + **Zod v4** | **react-hook-form** + **Zod v3** |
| Toasts | react-toastify | — |
| Theming | — | next-themes (light/dark/system) |
| Icons | lucide-react | lucide-react |
| Package manager | pnpm | pnpm |

---

## Repository Structure

```
e-commerce-ui/
├── client/                          # Customer storefront ("TrendLama")
│   ├── package.json                 # name: ecomgithub
│   ├── public/                      # logo, featured/klarna/cards/stripe images, products/
│   └── src/
│       ├── types.ts                 # ProductType, CartItemType + Zod schemas
│       ├── app/
│       │   ├── page.tsx             # "/"          homepage
│       │   ├── layout.tsx           # Navbar + Footer + ToastContainer
│       │   ├── cart/page.tsx        # "/cart"      3-step checkout (client)
│       │   └── products/
│       │       ├── page.tsx         # "/products"  catalog
│       │       └── [id]/page.tsx    # "/products/:id" detail
│       ├── components/              # Navbar, Footer, ProductCard, ProductList,
│       │                            # Categories, Filter, ProductInteraction,
│       │                            # ShippingForm, PaymentForm, ShoppingCartIcon…
│       └── stores/cartStore.ts      # Zustand cart (persist → localStorage)
│
└── admin/                           # Admin dashboard (shadcn-style)
    ├── package.json                 # name: shadcn
    ├── components.json              # shadcn CLI config
    ├── public/                      # logo, products/, users/
    └── src/
        ├── app/
        │   ├── page.tsx             # "/"                analytics dashboard
        │   ├── layout.tsx           # Theme > Sidebar + Navbar shell
        │   ├── products/page.tsx    # "/products"        table + columns + data-table
        │   ├── users/
        │   │   ├── page.tsx         # "/users"           table
        │   │   └── [id]/page.tsx    # "/users/:id"       profile
        │   └── payments/page.tsx    # "/payments"        table
        ├── components/
        │   ├── AppSidebar.tsx       # main navigation
        │   ├── Navbar.tsx           # topbar (theme toggle, avatar)
        │   ├── Add*/Edit*           # Sheet-based forms (Product, Category, User, Order)
        │   ├── App{Bar,Area,Line,Pie}Chart.tsx
        │   ├── CardList.tsx, TodoList.tsx, TablePagination.tsx
        │   └── ui/                  # 24 shadcn primitives
        ├── hooks/use-mobile.ts
        └── lib/utils.ts             # cn() helper
```

> The two apps share **no code** — each keeps its own copy of the product mock data and images. They are connected only conceptually, through the shared data shapes described in the [class diagrams](#3-class-diagrams).

---

## Getting Started

**Prerequisites:** [Node.js](https://nodejs.org) 20.19+ (Next.js 15 requirement) and [pnpm](https://pnpm.io) (`corepack enable pnpm`).

> **Node version note:** prefer a Node **22 or 24 LTS** release. Node ≥25 enables an experimental server-side `localStorage` stub, which makes libraries that detect storage via `typeof localStorage` throw `localStorage.getItem is not a function` during SSR. If you must stay on Node 25, start the dev servers with `NODE_OPTIONS=--no-experimental-webstorage` to disable the stub.

```bash
git clone https://github.com/safak/e-commerce-ui.git
cd e-commerce-ui
```

Run each app in its own terminal:

```bash
# Terminal 1 — storefront on http://localhost:3000
cd client
pnpm install
pnpm dev
```

```bash
# Terminal 2 — dashboard on http://localhost:3001
cd admin
pnpm install
pnpm dev -- -p 3001
```

Other scripts (both apps): `pnpm build`, `pnpm start`, `pnpm lint`.

---

## Client Storefront

### Routes

| Route | File | Rendered as | Purpose |
|---|---|---|---|
| `/` | `src/app/page.tsx` | Server | Hero banner + product grid, filtered by `?category=` |
| `/products` | `src/app/products/page.tsx` | Server | Catalog with `Categories` + `Filter` sidebar, `?category=` / `?sort=` |
| `/products/[id]` | `src/app/products/[id]/page.tsx` | Server | Detail view, `?color=` / `?size=` select the shown variant |
| `/cart` | `src/app/cart/page.tsx` | Client | 3-step checkout driven by `?step=1\|2\|3` |

### Key behaviors

- **URL-as-state** — category, sort, size, color and checkout step live in query parameters (`useSearchParams` + `router.push`), which keeps page components as server components.
- **Cart** — `stores/cartStore.ts` (Zustand + `persist`, storage key `cart`). `addToCart` merges duplicates by `id + selectedSize + selectedColor`; `ShoppingCartIcon` waits for `hasHydrated` before rendering (SSR-safe).
- **Checkout** — step 1 reads the store and computes subtotal/discount/shipping/total; step 2 validates shipping via `shippingFormSchema` and stores it in page state; step 3 renders `PaymentForm` only after shipping was captured.

---

## Admin Dashboard

### Routes

| Route | File | Purpose |
|---|---|---|
| `/` | `src/app/page.tsx` | Dashboard: revenue bar chart, latest transactions, browser pie chart, todo list, visitors area chart, popular products |
| `/products` | `src/app/products/page.tsx` | 8 products — sortable/paginated table with row selection |
| `/users` | `src/app/users/page.tsx` | 36 users — same table pattern |
| `/users/[id]` | `src/app/users/[id]/page.tsx` | User profile: badges, info card, edit sheet, activity line chart |
| `/payments` | `src/app/payments/page.tsx` | 36 payments — same table pattern |

### The 3-file table pattern

Every entity (`payments/`, `products/`, `users/`) repeats one trio:

1. **`page.tsx`** (server) — async `getData()` returns hard-coded rows → `<DataTable columns data />`
2. **`columns.tsx`** (client) — declarative `ColumnDef[]`: select checkbox, image column, sortable header, status badge, actions dropdown
3. **`data-table.tsx`** (client) — generic TanStack table: sorting, pagination, row selection → `DataTablePagination`

### Forms & theming

- **Sheet CRUD** — sidebar button opens a Radix `Sheet` containing a react-hook-form + Zod form (`AddProduct`, `AddCategory`, `AddUser`, `EditUser`, `AddOrder`). Validation is complete; submit handlers are intentionally unwired (UI-only).
- **Theming** — `ThemeProvider` (next-themes) wraps `SidebarProvider`; sidebar open state is stored in the `sidebar_state` cookie.

---

## UML Diagrams

> All diagrams use Mermaid syntax and render natively on GitHub.

### 1. Use Case Diagrams

**Storefront — customer actor:**

```mermaid
flowchart LR
  C(("Customer"))

  subgraph S1["TrendLama Storefront (client)"]
    UC1(("Browse products"))
    UC2(("Filter by category"))
    UC3(("Sort products"))
    UC4(("View product details"))
    UC5(("Select size / color / quantity"))
    UC6(("Add to cart"))
    UC7(("View / remove cart items"))
    UC8(("Review order summary"))
    UC9(("Enter shipping address"))
    UC10(("Enter payment details"))
    UC11(("Search products"))
    UC12(("Sign in"))
  end

  C --> UC1
  C --> UC2
  C --> UC3
  C --> UC4
  C --> UC5
  C --> UC6
  C --> UC7
  C --> UC8
  C --> UC9
  C --> UC10
  C -.-> UC11
  C -.-> UC12

  UC1 --> UC4
  UC4 --> UC5
  UC5 --> UC6
  UC7 --> UC8
  UC8 --> UC9
  UC9 --> UC10

  style UC11 stroke-dasharray: 5 5
  style UC12 stroke-dasharray: 5 5
```

Dashed links = UI exists but is not functional yet (see [Known Gaps](#known-gaps--good-first-issues)).

**Dashboard — admin actor:**

```mermaid
flowchart LR
  A(("Admin"))

  subgraph S2["Admin Dashboard (admin)"]
    UA1(("View analytics dashboard"))
    UA2(("List products"))
    UA3(("Add product / category"))
    UA4(("List users"))
    UA5(("View user profile"))
    UA6(("Edit user"))
    UA7(("List payments"))
    UA8(("Sort / paginate / select rows"))
    UA9(("Bulk delete selection"))
    UA10(("Toggle theme"))
    UA11(("Add order"))
  end

  A --> UA1
  A --> UA2
  A --> UA3
  A --> UA4
  A --> UA5
  A --> UA6
  A --> UA7
  A --> UA8
  A -.-> UA9
  A --> UA10
  A -.-> UA11

  UA2 --> UA8
  UA4 --> UA8
  UA7 --> UA8
  UA4 --> UA5
  UA5 --> UA6

  style UA9 stroke-dasharray: 5 5
  style UA11 stroke-dasharray: 5 5
```

---

### 2. Component Diagram

Static structure of the two apps and the libraries/components each depends on (package-assembly view):

```mermaid
flowchart TB
  subgraph Client["client — Storefront"]
    direction TB
    CPages["App Router pages<br/>/ · /products · /products/[id] · /cart"]
    CComp["Components<br/>Navbar · Categories · Filter · ProductList<br/>ProductCard · ProductInteraction · Forms"]
    CStore["stores/cartStore.ts<br/>Zustand + persist"]
    CTypes["types.ts<br/>ProductType · CartItemType · Zod schemas"]
    CPages --> CComp
    CComp --> CStore
    CComp --> CTypes
    CStore --> CTypes
  end

  subgraph Admin["admin — Dashboard"]
    direction TB
    APages["App Router pages<br/>/ · /products · /users · /users/[id] · /payments"]
    AComp["Components<br/>AppSidebar · Navbar · Add*/Edit* sheets<br/>charts · CardList · TodoList"]
    ATable["data-table.tsx<br/>generic TanStack Table"]
    AColumns["columns.tsx<br/>ColumnDef definitions"]
    AUI["shadcn/ui (24 primitives)<br/>+ Radix UI"]
    ACharts["recharts"]
    ATheme["next-themes<br/>ThemeProvider"]
    APages --> AComp
    APages --> AColumns
    AColumns --> ATable
    AComp --> AUI
    AComp --> ACharts
    APages --> ATheme
  end

  Tailwind["Tailwind CSS v4"]
  RHF["react-hook-form + Zod"]
  Lucide["lucide-react icons"]

  Client --- Tailwind
  Client --- RHF
  Client --- Lucide
  Admin --- Tailwind
  Admin --- RHF
  Admin --- Lucide

  Mock[("// TEMPORARY mock data<br/>in-file constants · no backend //")]
  Assets["public/ static assets<br/>products/ · users/ · logos"]
  Mock -.-> CPages
  Mock -.-> APages
  Assets -.-> CPages
  Assets -.-> APages

  style Mock fill:#fff3cd,stroke:#d39e00
```

---

### 3. Class Diagrams

**Client domain model** (`client/src/types.ts` + `stores/cartStore.ts`):

```mermaid
classDiagram
  direction LR

  class ProductType {
    +id: string | number
    +name: string
    +shortDescription: string
    +description: string
    +price: number
    +sizes: string[]
    +colors: string[]
    +images: Record~string, string~
  }

  class CartItemType {
    +quantity: number
    +selectedSize: string
    +selectedColor: string
  }

  class CartStoreStateType {
    +cart: CartItemsType
    +hasHydrated: boolean
  }

  class CartStoreActionsType {
    +addToCart(product: CartItemType) void
    +removeFromCart(product: CartItemType) void
    +clearCart() void
  }

  class ShippingFormInputs {
    +name: string
    +email: string
    +phone: string
    +address: string
    +city: string
  }

  class PaymentFormInputs {
    +cardHolder: string
    +cardNumber: string
    +expirationDate: string
    +cvv: string
  }

  ProductType <|-- CartItemType : "extends (type intersection)"
  CartItemType "1..*" *-- "1" CartStoreStateType : cart
  CartStoreStateType *-- CartStoreActionsType : store
  ProductType ..> ShippingFormInputs : "checkout uses"
  ProductType ..> PaymentFormInputs : "checkout uses"
```

**Admin entities** (row shapes returned by each `getData()`):

```mermaid
classDiagram
  direction LR

  class Product {
    +id: number
    +name: string
    +price: number
    +status: string
    +image: string
  }

  class User {
    +id: number
    +avatar: string
    +status: active | inactive
    +fullName: string
    +email: string
  }

  class Payment {
    +id: number
    +amount: number
    +status: pending | success | failed
    +userId: number
  }

  class TodoItem {
    +title: string
    +date: Date
  }

  User "1" <-- "0..*" Payment : userId
  User "1" <-- "0..*" Product : manages
  User "1" <-- "0..*" TodoItem : assigned
```

---

### 4. Sequence Diagrams

**Add to cart** (client):

```mermaid
sequenceDiagram
  actor C as Customer
  participant Card as ProductCard
  participant Store as cartStore (Zustand)
  participant LS as localStorage
  participant UI as Toast / Cart badge

  C->>Card: select size & color swatches
  C->>Card: click "Add to Cart"
  Card->>Card: build CartItemType (quantity 1)
  Card->>Store: addToCart(item)
  alt same id + size + color exists
    Store->>Store: increment quantity
  else new combination
    Store->>Store: append item to cart array
  end
  Store->>LS: persist JSON under key "cart"
  Store-->>Card: new cart state
  Card->>UI: toast.success("Added to cart")
  Note over Store,UI: Badge updates via hasHydrated rehydration on next page load
```

**3-step checkout** (client):

```mermaid
sequenceDiagram
  actor C as Customer
  participant Cart as CartPage /cart?step=N
  participant Ship as ShippingForm
  participant Pay as PaymentForm
  participant Store as cartStore

  C->>Cart: navigate /cart?step=1
  Cart->>Store: read cart items
  Store-->>Cart: CartItemsType
  Cart->>Cart: subtotal, discount(10%), $10 shipping, total
  C->>Cart: click "Continue"
  Cart->>Cart: router.push(/cart?step=2)
  C->>Ship: fill name, email, phone, address, city + submit
  Ship->>Ship: zodResolver validates shippingFormSchema
  Ship->>Cart: setShippingForm(data)  (page state)
  Ship->>Cart: router.push(/cart?step=3)
  Cart->>C: render PaymentForm (only if shippingForm set)
  C->>Pay: fill card details + submit
  Pay->>Pay: zodResolver validates paymentFormSchema
  Note over Pay: handlePaymentForm is empty — no API call (UI-only)
```

**Admin table lifecycle:**

```mermaid
sequenceDiagram
  participant P as page.tsx (server)
  participant G as getData()
  participant Col as columns.tsx
  participant DT as DataTable (TanStack)
  participant PG as DataTablePagination

  P->>G: await getData()
  G-->>P: hard-coded rows (8 / 36)
  P->>DT: <DataTable columns data />
  DT->>DT: useReactTable (sorting, rowSelection)
  DT->>DT: header click → toggleSorting
  DT->>PG: current page slice
  PG-->>DT: page / pageSize change
  DT-->>P: rendered table
  Note over DT: "Delete N(s)" button appears on selection — handler unwired
```

---

### 5. Deployment Diagram

Both apps are self-contained Next.js deployments — they only need a Node runtime and the browser's `localStorage`. There is no database or API server (yet):

```mermaid
flowchart TB
  subgraph Browser["Web Browser"]
    direction LR
    subgraph CTab["Tab — Storefront"]
      CSR_C["Next.js client bundle<br/>(RSC + hydrate)"]
      LS[("localStorage<br/>key: cart")]
    end
    subgraph ATab["Tab — Dashboard"]
      CSR_A["Next.js client bundle<br/>(RSC + hydrate)"]
    end
  end

  subgraph NodeHost["Node.js host (e.g. Vercel / self-hosted)"]
    direction LR
    SrvC["next start — client<br/>port 3000"]
    SrvA["next start — admin<br/>port 3001"]
    StaticC["client/public<br/>product images"]
    StaticA["admin/public<br/>product & user images"]
  end

  CTab -->|"HTTP / · /products · /cart"| SrvC
  ATab -->|"HTTP / · /products · /users · /payments"| SrvA
  SrvC --> StaticC
  SrvA --> StaticA
  CSR_C <--> LS

  DB[("Database / API<br/>not yet implemented")]
  SrvC -.->|"future"| DB
  SrvA -.->|"future"| DB

  style DB fill:#f8d7da,stroke:#c00,stroke-dasharray: 5 5
```

---

## Architecture Patterns

1. **Server/Client component split** — pages and data-holding components are server components; `"use client"` is used only where interactivity, browser APIs or recharts are required (cart, forms, tables, charts, sidebar).
2. **URL-as-state (client)** — filters and checkout steps live in query parameters, so navigation stays shareable and server-rendered.
3. **Store-backed cart** — all cart mutations flow through one Zustand store; `persist` handles localStorage sync and `hasHydrated` guards SSR mismatches.
4. **Declarative tables (admin)** — each entity gets `page → columns → data-table`, so adding a new table is mostly a column definition.
5. **Sheet-based CRUD (admin)** — forms open in a Radix `Sheet` instead of separate pages, keeping the dashboard shell mounted.
6. **Mock-data seam** — everything the apps "fetch" lives behind small async `getData()` functions or in-file constants marked `// TEMPORARY`; replacing them with real API calls is the natural next step.

---

## Known Gaps & Good First Issues

Objective gaps found while documenting the codebase — great contribution candidates:

| # | Issue | Location |
|---|---|---|
| 1 | `/login` is linked from the navbar but no route exists (404) | `client/src/components/Navbar.tsx:31` |
| 2 | "View customer" action links to `/products/:id` but there is no `products/[id]` route | `admin/src/app/products/columns.tsx:110` |
| 3 | Sidebar "See All Transactions" points to `/users` instead of `/payments` | `admin/src/components/AppSidebar.tsx:199` |
| 4 | `Filter.tsx` writes `?sort=` to the URL but the sort is never applied to product data | `client/src/components/Filter.tsx` |
| 5 | `SearchBar` has no submit handler — search is visual only | `client/src/components/SearchBar.tsx` |
| 6 | `handlePaymentForm` body is empty (no API call, no confirmation step) | `client/src/components/PaymentForm.tsx` |
| 7 | Sidebar entries `Inbox`, `Calendar`, `Search`, `Settings`, `Add Category`, `Add Order` link to `#` | `admin/src/components/AppSidebar.tsx` |
| 8 | Order summary shows a hard-coded `$10` discount and ignores `−$10` shipping in the total | `client/src/app/cart/page.tsx:194-210` |
| 9 | Product mock data (8 products) is duplicated in 4 files across both apps | see `ProductList.tsx`, `[id]/page.tsx`, `admin/products/page.tsx`, `CardList.tsx` |
| 10 | No tests, no CI, no `.env` examples — thin out as the project grows | repo-wide |

---

## Contributing

Contributions are welcome — whether fixing an item from the table above or adding documentation.

1. **Fork** the repository and create your branch from `completed`:
   ```bash
   git checkout -b fix/sidebar-transactions-link completed
   ```
2. **Make your changes** in the relevant app (`client/` or `admin/`).
3. **Verify** before committing:
   ```bash
   cd client && pnpm lint && pnpm build   # or cd admin
   ```
4. **Open a Pull Request** against the `completed` branch with a clear description of the change and, for UI work, a before/after screenshot.

Please keep the two apps independent (no shared workspace) and follow the existing patterns — Tailwind classes inline, `// TEMPORARY` markers on mock data, and server components by default.

---

## License

Released under the [MIT License](LICENSE).
