# TrendLama Storefront

The **customer storefront** for the TrendLama e-commerce UI. A standalone **Next.js 15** (App Router) application covering the shopping journey: browse a catalog, filter by category, pick a size/color/quantity on the product page, keep a persistent cart, and complete a three-step checkout with validated forms.

> This app is **UI-only**. There is no backend — products are hard-coded behind async `getData()` functions or `// TEMPORARY` constants, and the payment step never calls an API. See the [root README](../README.md) for the full project overview and UML diagrams.

![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5-2D3748?logo=react)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Product Catalog](#product-catalog)
- [Cart & State](#cart--state)
- [Three-Step Checkout](#three-step-checkout)
- [Forms & Validation](#forms--validation)
- [Data & the Mock Seam](#data--the-mock-seam)
- [Known Gaps](#known-gaps)

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js **15.4.5** (App Router, Turbopack) |
| UI library | React **19.1.0** |
| Language | TypeScript 5 |
| Styling | Tailwind CSS **v4** |
| State | **Zustand 5** + `persist` middleware (localStorage) |
| Forms | **react-hook-form** + **Zod v4** (`@hookform/resolvers`) |
| Toasts | **react-toastify** |
| Icons | `lucide-react` |

---

## Getting Started

**Prerequisites:** [Node.js](https://nodejs.org) 20.19+ and [pnpm](https://pnpm.io).

```bash
cd client
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Run the [admin dashboard](../admin/README.md) on a different port (e.g. `-- -p 3001`).

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
client/
├── public/
│   ├── featured.png, logo.png, klarna.png, cards.png, stripe.png
│   └── products/              # 1g.png … 8gr.png
└── src/
    ├── types.ts               # ProductType, CartItemType + Zod schemas
    ├── app/
    │   ├── layout.tsx         # Navbar + Footer + <ToastContainer>
    │   ├── page.tsx           # "/"            homepage (hero + product grid)
    │   ├── products/
    │   │   ├── page.tsx       # "/products"    catalog with categories + sort
    │   │   └── [id]/page.tsx  # "/products/:id" detail + purchase controls
    │   └── cart/page.tsx      # "/cart"        3-step checkout (client)
    ├── components/
    │   ├── Navbar.tsx, Footer.tsx, SearchBar.tsx, ShoppingCartIcon.tsx
    │   ├── Categories.tsx, Filter.tsx, ProductList.tsx, ProductCard.tsx
    │   ├── ProductInteraction.tsx
    │   └── ShippingForm.tsx, PaymentForm.tsx
    └── stores/cartStore.ts    # Zustand cart (persist → localStorage)
```

---

## Routes

| Route | File | Rendered as | Purpose |
|---|---|---|---|
| `/` | `src/app/page.tsx` | Server | Hero banner + product grid (`?category=`) |
| `/products` | `src/app/products/page.tsx` | Server | Full catalog with `Categories` + `Filter` (`?category=` / `?sort=`) |
| `/products/[id]` | `src/app/products/[id]/page.tsx` | Server | Detail view; `?color=` / `?size=` select the shown variant, `generateMetadata` sets the title |
| `/cart` | `src/app/cart/page.tsx` | Client | Checkout driven by `?step=1\|2\|3` |

---

## Product Catalog

- **`ProductList.tsx`** holds the 8-product mock array (`// TEMPORARY`) and renders a responsive grid of `ProductCard`s. Its `params` prop (`"homepage"` \| `"products"`) decides whether the `Filter` sort control appears.
- **`Categories.tsx`** and **`Filter.tsx`** are `"use client"` components that write to the URL with `useRouter` / `usePathname` / `useSearchParams` using `{ scroll: false }` — this is the **URL-as-state** pattern that keeps the page components as server components.
- **`ProductCard.tsx`** lets the shopper pick a size and color locally (React state), then `addToCart(...)` and shows a `react-toastify` success toast.
- **`ProductInteraction.tsx`** (on the detail page) additionally manages quantity with +/− buttons, and pushes `?size=` / `?color=` changes to the URL so the selected image variant is server-rendered.

---

## Cart & State

All cart state lives in one Zustand store, `src/stores/cartStore.ts`:

- **Persistence** — wrapped in `persist` with `createJSONStorage(() => localStorage)` guarded by `typeof window !== "undefined"`, stored under the key **`cart`**.
- **SSR safety** — `onRehydrateStorage` flips `hasHydrated` to `true`; `ShoppingCartIcon` returns `null` until then, avoiding hydration mismatches. The badge sums `quantity` across items.
- **Actions** — `addToCart` merges an item that matches on **`id` + `selectedSize` + `selectedColor`** by incrementing its quantity, otherwise appends; `removeFromCart` filters out that same composite key; `clearCart` empties the cart.

The relevant types (`ProductType`, `CartItemType`, `CartStoreStateType`, `CartStoreActionsType`) are defined in `src/types.ts`.

---

## Three-Step Checkout

`/cart` is a client component that reads the active step from the `?step=` query parameter:

1. **Shopping Cart** — lists items from the store with quantity/size/color and a remove button, plus a live subtotal.
2. **Shipping Address** — renders `ShippingForm`; on a valid submit it stores the data in page state and pushes `/cart?step=3`.
3. **Payment Method** — renders `PaymentForm` **only if** shipping data is present, otherwise shows "Please fill in the shipping form to continue."

The order summary recomputes `subtotal` from the store. Because the shipping data is component state (not persisted), a full reload on step 3 falls back to the "please fill in" message.

---

## Forms & Validation

Both checkout forms use `react-hook-form` with `zodResolver`:

| Form | Schema | Rules |
|---|---|---|
| `ShippingForm` | `shippingFormSchema` | name/address/city required; valid email; phone 7–10 digits |
| `PaymentForm` | `paymentFormSchema` | card holder required; card number exactly 16 digits; `MM/YY` expiry; 3-digit CVV |

Schemas live in `src/types.ts`. `PaymentForm`'s `handlePaymentForm` is intentionally empty — checkout is not wired to any API.

---

## Data & the Mock Seam

There is no database and no `fetch`. Product data is duplicated in `ProductList.tsx` and `products/[id]/page.tsx` as `// TEMPORARY` constants; the cart page keeps a commented-out `cartItems` fixture. This is the seam where a real API plugs in — swap the constants for fetch calls and the components stay as they are.

---

## Known Gaps

Objective gaps in the current code — good starting points for contributions:

| # | Issue | Location |
|---|---|---|
| 1 | `/login` is linked from the navbar but no route exists (404) | `src/components/Navbar.tsx:31` |
| 2 | Category selection writes `?category=` but the product list never filters by it | `src/components/ProductList.tsx` |
| 3 | `Filter.tsx` writes `?sort=` but the sort is never applied to the data | `src/components/Filter.tsx` |
| 4 | `SearchBar` has no submit handler — search is visual only | `src/components/SearchBar.tsx` |
| 5 | "Buy this Item" button has no handler | `src/components/ProductInteraction.tsx:122` |
| 6 | Order summary shows a hard-coded `$10` discount and ignores the `$10` shipping fee in the total | `src/app/cart/page.tsx:193-210` |
| 7 | `handlePaymentForm` body is empty (no API call, no confirmation step) | `src/components/PaymentForm.tsx:19` |
| 8 | Product mock data is duplicated across `ProductList.tsx` and `products/[id]/page.tsx` | see files |
| 9 | `generateMetadata` uses a `describe` key instead of `description` | `src/app/products/[id]/page.tsx:32` |
| 10 | No tests and no CI | repo-wide |

---

## Related

- [Root README](../README.md) — project overview, architecture patterns and UML diagrams.
- [`admin/`](../admin/README.md) — the admin dashboard.
