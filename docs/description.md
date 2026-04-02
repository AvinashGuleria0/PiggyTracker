
# PiggyTracker: Complete Requirements Checklist

## Phase 1: Project Setup & Tooling 🛠️
- [ ] Initialize project using Vite + React + TypeScript (`npm create vite@latest piggy-tracker -- --template react-ts`).
- [ ] Install Tailwind CSS and configure `tailwind.config.js`.
- [ ] Setup path aliases (e.g., `@/*` pointing to `src/`) in `vite.config.ts` and `tsconfig.json`.
- [ ] Initialize `shadcn/ui` (`npx shadcn-ui@latest init`).
- [ ] Install required `shadcn` components (Button, Dialog, Input, Select, Table, Dropdown Menu).
- [ ] Install core libraries: `zustand`, `recharts`, `framer-motion`, `react-router-dom`, `lucide-react`, `date-fns` (for date formatting).
- [ ] Define global Neo-Brutalist CSS variables/classes in `index.css` (thick borders, hard shadows, custom font).

## Phase 2: Global State Management (Zustand) 🧠
- [ ] Create `useAppStore.ts` in `src/store/`.
- [ ] Define TypeScript Interfaces (`User`, `Transaction`, `FilterState`, `AppState`).
- [ ] Implement `persist` middleware to save state to LocalStorage.
- [ ] Implement User Actions: `login()`, `logout()`, `switchRole()` (with 1.5s simulated async delay).
- [ ] Implement Transaction CRUD Actions: `addTransaction()`, `updateTransaction()`, `deleteTransaction()`.
- [ ] Implement Filter Action: `setFilters()`.
- [ ] Populate store with 5-10 mock transactions by default so the dashboard isn't empty on first load.

## Phase 3: Utilities & Core UI Components 🧩
- [ ] Create `formatCurrency()` helper function.
- [ ] Create `exportToCSV()` helper function (dynamically generates and downloads `.csv`).
- [ ] Build `<NeoCard />` wrapper component (applies the thick borders, bright background colors, hard shadows).
- [ ] Build `<SkeletonLoader />` component (pulsing YouTube-style blocks for loading states).
- [ ] Setup Dark Mode Provider (toggles `dark` class on the HTML root element).

## Phase 4: Routing & Application Layout 🗺️
- [ ] Setup `react-router-dom` with routes: `/` (Public), `/dashboard` (Protected wrapper), `/dashboard/overview`, `/dashboard/transactions`, `/dashboard/insights`.
- [ ] Build `<DashboardLayout />`:
  - [ ] **Left Sidebar:** Navigation links (Overview, Transactions, Insights) with active-state styling.
  - [ ] **Top Header:** Page Title / Breadcrumbs.
  - [ ] **Top Header Actions:** Dark Mode Toggle, Export to CSV Button.
  - [ ] **Top Header Profile Dropdown:** Shows User Name, Avatar, and the "Switch Role" toggle.
- [ ] Implement Role-Switching mechanic: When toggling Admin/Viewer, trigger the `isLoading` state and render `<SkeletonLoader />` over the main content area for 1.5s.

## Phase 5: Landing Page & Auth (Public Route) 🚀
- [ ] Build **Hero Section**: Big bold Neo-brutalist headline ("Take Control of Your Piggy Bank").
- [ ] Add Framer Motion animations to the Hero (e.g., coins bouncing, SVG piggy bank).
- [ ] Build **"What We Do" Section**: Scroll down area with 3 features (Track, Visualize, Export) and mock UI images.
- [ ] Build **Dummy Auth Modal** (shadcn Dialog):
  - [ ] Triggered by clicking "Get Started" in the Hero.
  - [ ] Input field for "Your Name".
  - [ ] Two distinct buttons: "Enter as Admin" and "Enter as Viewer".
  - [ ] On click -> Call `login()` in Zustand -> Redirect to `/dashboard/overview`.

## Phase 6: Dashboard Overview Page 📊
- [ ] Build **Summary Cards Row**:
  - [ ] Total Balance Card (Calculated from transactions).
  - [ ] Total Income Card (Green text/icon).
  - [ ] Total Expenses Card (Red text/icon).
-[ ] Build **Balance Trend Chart**:
  - [ ] Use `Recharts` Line or Area chart.
  - [ ] Map transactions over time (last 6 months or current month).
  - [ ] Add Framer Motion entrance animation.
- [ ] Build **Recent Transactions Widget**:
  - [ ] List only the latest 5 transactions.
  - [ ] Show Name, Date, and Amount.

## Phase 7: Transactions Hub Page 💸
- [ ] Build **Filter Bar**:
  - [ ] Search Input (search by transaction title).
  - [ ] Category Dropdown (All, Food, Rent, Salary, Entertainment, etc.).
  - [ ] Type Dropdown (All, Income, Expense).
- [ ] Build **Transactions Table/List**:
  - [ ] Map filtered transactions.
  - [ ] Columns: Date, Title, Amount, Category (colorful badge style), Actions.
- [ ] **Admin vs. Viewer Logic**:
  - [ ] If `role === 'admin'`: Show "Add Transaction" button at the top.
  -[ ] If `role === 'admin'`: Show Edit/Trash icons on each table row.
  - [ ] If `role === 'viewer'`: Hide the Add button and Action columns entirely.
- [ ] Build **Add/Edit Transaction Modal**:
  - [ ] Fields: Title, Amount (number), Type (Radio buttons), Category (Select), Date (Date picker).
  - [ ] Form Validation: Prevent submission if empty or amount is <= 0.

## Phase 8: Insights Page 🧠
- [ ] Build **Categorical Spending Chart**:
  - [ ] Use `Recharts` Donut/Pie chart.
  - [ ] Group expenses by category and calculate totals.
  - [ ] Ensure bright Neo-Brutalist colors are passed to the chart slices.
- [ ] Build **Smart Text Insights Widgets**:
  - [ ] Calculate and display: "Highest spending category".
  - [ ] Calculate and display: "Largest single transaction".
  - [ ] Fun conditional text (e.g., if highest spend is 'Food', output "You spent the most on Food! Time to cook at home?").

## Phase 9: Polish & Edge Cases ✨
- [ ] Add **Framer Motion Page Transitions**: Fade/slide effect when switching between Overview, Transactions, and Insights.
- [ ] Add **List Stagger Animations**: Transaction table rows slide in one-by-one on load.
- [ ] Handle **Empty States**: Create a fun `<EmptyState />` component (e.g., "No transactions found!") to show when filters yield 0 results or data is empty.
- [ ] Verify **Responsiveness**: Ensure the Sidebar becomes a bottom-bar or hamburger menu on mobile devices. Ensure charts resize correctly.
- [ ] Verify **Data Persistence**: Refresh the page. Ensure the user stays logged in, role remains the same, and any added transactions are still there.

## Phase 10: Submission Prep 📝
- [ ] Write the `README.md`:
  - [ ] Project Title & description.
  - [ ] Setup instructions (`npm install`, `npm run dev`).
  - [ ] Explanation of technical choices (Zustand, Neo-brutalism, Framer Motion).
  - [ ] Note on how to test the simulated RBAC and Mock API delays.
- [ ] Final Code Review: Remove console logs, format code, ensure no TypeScript errors.

