# PiggyTracker - Finance Dashboard UI


PiggyTracker is a modern, responsive, and interactive Personal Finance Dashboard built to track and understand financial activity. Designed with a striking **Neo-Brutalist** aesthetic, this project was developed as a submission for the **Zorvyn Frontend Developer Intern Assignment**.

## Live Demo
https://piggy-tracker.vercel.app/

---

## Objective & Requirements Met
This project directly satisfies all core requirements and optional enhancements outlined in the Zorvyn assignment:

### Core Requirements
- **Dashboard Overview:** Dynamic summary cards (Balance, Income, Expense) and real-time Balance Trend line charts.
- **Transactions Section:** Comprehensive table displaying Date, Amount, Type, and Category with built-in search and filtering.
- **Basic Role-Based UI (RBAC):** Simulated authentication. `Admin` users can add/edit/delete transactions, while `Viewer` users are restricted to read-only access.
- **Insights Section:** Visual breakdown of spending (Pie Chart) and Month-over-Month cash flow comparisons (Bar Chart).
- **State Management:** Fully managed globally using **Zustand**, completely decoupled from prop-drilling.
- **UI/UX Expectations:** Clean Neo-Brutalist design, fully responsive from mobile to ultra-wide desktop monitors, featuring graceful Empty States for zero-data scenarios.

### Optional Enhancements Achieved
- **Dark Mode:** System-aware and manually toggleable Dark/Light themes.
- **Data Persistence:** User sessions, theme preferences, and transactions are saved reliably to `localStorage`.
- **Animations:** Fluid page transitions and interactable micro-animations powered by Framer Motion.
- **Export Functionality:** Users can export their localized transaction history directly to `.csv`.

---

## Technical Architecture

### Tech Stack
- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **UI Components:** custom-styled `shadcn/ui` components (Neo-Brutalism theme)
- **State Management:** Zustand (with persist middleware)
- **Data Visualization:** Recharts
- **Icons & Assets:** Lucide React & React Icons
- **Animations:** Framer Motion

### Key Technical Decisions
1. **Zustand over Redux:** For a client-side dashboard, Zustand provided the perfect balance of boilerplate-free global state management while easily supporting `localStorage` persistence.
2. **Selectors for Performance:** Financial calculations (Total Income, Total Expense, Balance) are memoized and abstracted into Zustand selectors to prevent unnecessary re-renders across the dashboard components.
3. **Centralized Constants:** Categories, color palettes, and Regex validations are strictly decoupled into a `src/constants/` and `src/utils/` directory to ensure DRY principles.
4. **Strict Typing:** Heavy utilization of TypeScript interfaces, discriminated unions, and `as const` assertions to guarantee zero runtime type-errors.
5. **Responsive Design:** Mobile-first Tailwind breakpoints. The sidebar transforms into a collapsible hamburger drawer on mobile/tablet, while data tables intelligently hide non-critical columns on tiny screens to avoid horizontal scrolling.

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AvinashGuleria0/PiggyTracker.git
   cd PiggyTracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   *The application will boot up at `http://localhost:5173`.*

4. **Build for Production**
   ```bash
   npm run build
   ```

---

## Project Structure

```text
src/
├── components/           # Reusable functional components
│   ├── layout/           # Sidebar, TopHeader, Dashboard wrappers
│   ├── providers/        # Theme & Toast providers
│   ├── shared/           # NeoCard wrappers, Skeletons, Empty States
│   └── ui/               # Base shadcn/ui building blocks
├── constants/            # Global constants (categories.ts, colors.ts)
├── features/             # Domain-specific components
│   ├── dashboard/        # Summary Cards, Trend Charts
│   ├── insights/         # Pie & Bar Charts
│   ├── landing/          # Hero Section, Auth Modals
│   └── transactions/     # Tables, Filters, CRUD Modals
├── lib/                  # Utilities (Tailwind cn merger)
├── pages/                # Top-level route components
├── store/                # Zustand global state (useAppStore.ts)
├── types/                # TypeScript Interfaces & Types
└── utils/                # formatting, validation, csv export logic
```

---

## Author

**Avinash Guleria**
- Email: avinashguleria1009@gmail.com