# Low-Level Design (LLD)

The LLD breaks down the exact folder structure, TypeScript schemas, Zustand store design, and component interfaces.

## 1. Folder Structure
We will follow a scalable, feature-based modular folder structure inside `src/`.

```text
src/
├── assets/             # SVGs, images, global CSS (Neo-brutalist styles)
├── components/         # Reusable / Shared UI Components
│   ├── ui/             # shadcn UI components (buttons, dialogs, inputs)
│   ├── layout/         # Sidebar, TopHeader, DashboardLayout wrapper
│   └── shared/         # SkeletonLoader, NeoCard, ExportButton
├── features/           # Feature-specific components
│   ├── landing/        # Hero, FeatureScroll, AuthModal
│   ├── dashboard/      # SummaryCards, BalanceChart, RecentTransactions
│   ├── transactions/   # TransactionTable, AddModal, FilterBar
│   └── insights/       # CategoryPieChart, TextInsights
├── hooks/              # Custom React hooks (useRole, useTransactions)
├── pages/              # Route entry points (Landing.tsx, Overview.tsx...)
├── store/              # Zustand global store configuration
├── types/              # TypeScript interfaces and types
└── utils/              # Helper functions (CSV exporter, date formatters, mock API delays)
```

## 2. Data Models (TypeScript Schemas)
Located in `src/types/index.ts`.

```typescript
export type Role = "admin" | "viewer";
export type TransactionType = "income" | "expense";

export interface User {
  name: string;
  avatarSeed: string; // Used to generate a dicebear avatar
  role: Role;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string; // ISO string
}

export interface FilterState {
  searchQuery: string;
  category: string | "all";
  type: TransactionType | "all";
}
```

## 3. State Management (Zustand Store)
Located in `src/store/useAppStore.ts`. This store manages the simulated "Backend".

```typescript
interface AppState {
  // --- Data ---
  user: User | null;
  transactions: Transaction[];
  filters: FilterState;
  isSwitchingRole: boolean; // Triggers the skeleton loaders
  
  // --- Actions ---
  // Auth
  login: (name: string, role: Role) => void;
  logout: () => void;
  switchRole: (newRole: Role) => Promise<void>; // Async to simulate delay
  
  // Transactions (CRUD)
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, tx: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  
  // Filters
  setFilters: (filters: Partial<FilterState>) => void;
}
```

## 4. Core Utilities (`src/utils/`)

1.  **Mock API Simulator (`mockApi.ts`)**
    ```typescript
    export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    ```
2.  **CSV Exporter (`exportUtils.ts`)**
    *   Takes an array of `Transaction[]`.
    *   Converts to CSV string: `Date,Title,Amount,Type,Category\n...`
    *   Creates a `Blob`, generates a dynamic object URL, and triggers an anchor tag (`<a>`) click to download.
3.  **Currency Formatter (`formatters.ts`)**
    ```typescript
    export const formatCurrency = (amount: number): string => {
       return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }
    ```

## 5. Component Signatures & Key Features

### A. Dashboard Layout (`<DashboardLayout />`)
*   **Props:** `{ children: React.ReactNode }`
*   **Behavior:** Uses `Framer Motion` `AnimatePresence` to transition the `children` smoothly when routing. If `store.isSwitchingRole` is true, replaces `children` with the `<SkeletonLoader />` component.

### B. Neo-Brutalist Card (`<NeoCard />`)
*   **Props:** `{ title?: string, children: ReactNode, className?: string }`
*   **Behavior:** Base reusable component for all widgets. Applies `border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl bg-white dark:bg-zinc-800`.

### C. Transaction Table (`<TransactionTable />`)
*   **Dependencies:** Listens to `transactions` and `filters` from Zustand store.
*   **Logic:** 
    *   Computes derived state: `const filteredData = transactions.filter(...)`.
    *   Maps over `filteredData` to render rows.
    *   Checks `user.role === 'admin'` to render the ultimate column containing `<EditIcon />` and `<TrashIcon />`.

### D. Animations (Framer Motion Wrappers)
*   **Page Transitions:** `initial={{ opacity: 0, y: 20 }}` -> `animate={{ opacity: 1, y: 0 }}`.
*   **List Staggering:** Parent `ul` gets a `staggerChildren: 0.1` property. Each row `li` pops in smoothly upon mount.
