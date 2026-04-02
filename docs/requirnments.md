# Project Description: PiggyTracker

## 1. Project Overview
**PiggyTracker** is a modern, highly interactive, client-side personal finance dashboard built to evaluate frontend development and UI/UX design skills. It allows users to track their financial activity, view overall summaries, explore transactions, and understand spending patterns. The application simulates a real-world SaaS environment with role-based access control, mock API delays, and full data persistence, all wrapped in a playful, highly polished user interface.

## 2. UI/UX Design Language
*   **Vibe:** Playful Modern / Light Neo-Brutalism.
*   **Visual Characteristics:** 
    *   Thick, dark borders around cards, buttons, and inputs (e.g., `border-2 border-black`).
    *   Hard, solid black block shadows instead of soft blurred drop shadows.
    *   Bright, contrasting pastel and neon colors (Mint greens, sunny yellows, bright purples) for categorization and highlights.
    *   Fully responsive layout ensuring seamless use across desktop, tablet, and mobile devices.
*   **Dark Mode Support:** A built-in toggle that flips the application into a sleek dark neo-brutalist theme, maintaining high contrast and readability.
*   **Animations:** Powered by Framer Motion. Includes bouncy button clicks, smooth layout transitions, staggering list animations (items popping in one by one), and SVG animations (e.g., coins dropping into a piggy bank).

## 3. User Flow & Application Structure

### A. The Landing Page (Marketing View)
A visually captivating, scrolling 2-section page to welcome the user.
*   **Hero Section:** Features a large, bold Neo-Brutalist headline, a dynamic Framer Motion animation of coins interacting with a piggy bank/charts, and a prominent "Get Started" button.
*   **"What We Do" Section (Scroll down):** A cleanly designed section explaining core features (Track Expenses, Visual Insights, Export Data) accompanied by animated mockups of the UI charts bouncing into view.

### B. Dummy Authentication (Modal)
Instead of a dedicated auth page, clicking "Get Started" triggers a sleek Neo-Brutalist Dialog Modal.
*   **Inputs:** A text field for the user's Name.
*   **Actions:** Two large buttons to choose a role: **"Enter as Admin"** or **"Enter as Viewer"**.
*   Submitting this modal redirects the user into the main Dashboard application.

### C. Dashboard Layout Wrapper
The core layout for the authenticated state consists of two persistent navigation elements:
1.  **Left Sidebar (Navigation):** Professional SaaS-style navigation containing links to: Overview (Home), Transactions, and Insights. Highlighted states for the active page.
2.  **Top Header (Controls):** 
    *   **Left/Center:** Page Title or Breadcrumbs.
    *   **Right:** 
        *   Dark Mode Toggle.
        *   "Export to CSV" Button.
        *   Profile Dropdown (Displays user's Name and an Avatar).
        *   **Role Switcher:** Inside the dropdown, a toggle to switch between "Admin" and "Guest/Viewer" on the fly. 

## 4. Core Application Pages (The Dashboard)

### Page 1: Overview (`/`)
The command center for the user's finances.
*   **Summary Cards:** Three distinct cards displaying *Total Balance*, *Total Income*, and *Total Expenses*. Includes visual indicators (green arrows up, red arrows down).
*   **Time-Based Visualization:** A Recharts Line or Area chart mapping the "Balance Trend" over recent months. It mounts with a smooth drawing animation.
*   **Recent Transactions:** A preview list of the 5 most recent transactions, showing Name, Date, and Amount (color-coded green for income, red for expense).

### Page 2: Transactions Hub (`/transactions`)
The detailed data management center.
*   **Data Table/List:** Displays all transactions with columns for Date, Title, Amount, Category (styled as colorful pill badges), and Type.
*   **Advanced Filtering & Controls:**
    *   Search Bar (fuzzy search by transaction title).
    *   Category Filter (Multi-select dropdown: Food, Rent, Salary, etc.).
    *   Type Filter (Income vs. Expense).
*   **Role-Based Actions (Admin Only):** 
    *   A primary "Add Transaction" button that opens a comprehensive form modal (Title, Amount, Date Picker, Category Select, Type Radio buttons).
    *   Edit and Delete icon buttons on every transaction row.

### Page 3: Insights (`/insights`)
The analytical breakdown of user data.
*   **Categorical Visualization:** A Recharts Donut or Pie chart showing "Spending Breakdown by Category". Hovering over slices shows exact amounts and percentages.
*   **Dynamic Text Insights:** Smart text boxes that calculate observations based on state. Examples: 
    *   *"Your highest spending category this month is 🍔 Food."*
    *   *"You saved X% more than last month."*

## 5. Technical Mechanics & "Tiny Details"

*   **Mock API & YouTube-Style Skeleton Loaders:** To simulate a real application, data fetching and role-switching are wrapped in artificial delays (e.g., `setTimeout` for 1.5 seconds). During this delay, the UI shows pulsing, YouTube-style skeleton loading blocks to handle async UI states gracefully.
*   **Role-Based Access Control (RBAC):** 
    *   **Viewer Mode:** The UI strictly renders as read-only. The "Add Transaction" button is removed. Edit/Delete actions in the table are completely hidden.
    *   **Admin Mode:** Full CRUD (Create, Read, Update, Delete) access is granted.
*   **Data Persistence:** Handled via Zustand's `persist` middleware. The user's mock transactions, chosen role, user name, and theme preference are automatically saved to the browser's Local Storage. Refreshing the page will perfectly maintain the user's state.
*   **Export Functionality:** A utility function attached to the "Export to CSV" button that takes the currently *filtered* transaction data from the global state, converts it into comma-separated values, and triggers a file download to the user's local machine.
*   **Empty States:** If a user filters out all data or deletes all transactions, a beautiful empty state illustration (e.g., a sad empty piggy bank) and prompt appears instead of a broken or blank screen.
*   **Form Validation:** The "Add Transaction" modal prevents submission if fields are missing or if the amount is negative/zero.

***

Whenever you are ready to review the **High-Level Design / Low-Level Design (LLD)** outlining the component tree, folder structure, and precise Zustand state store details, just let me know!