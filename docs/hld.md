
# High-Level Design (HLD)

The HLD outlines the system architecture, data flow, and core mechanisms of the PiggyTracker application. Since this is a client-side only application, the architecture focuses on frontend modularity, state flow, and simulated asynchronous behaviors.

## 1. System Architecture
*   **Architecture Pattern:** Client-Side Rendering (CSR) Single Page Application (SPA).
*   **Core Engine:** React 18 + Vite.
*   **Routing:** `react-router-dom` (Browser Router).
*   **State Management:** Global state via Zustand (acting as our "database" with `persist` middleware).
*   **Styling Engine:** Tailwind CSS + PostCSS + CSS Variables (for dark mode).

## 2. Global Data Flow Architecture
The application follows a unidirectional data flow:
1.  **User Action:** User interacts with UI (e.g., clicks "Add Transaction").
2.  **Dispatch to Store:** Component calls a Zustand action (`addTransaction(data)`).
3.  **State Update:** Zustand updates the global state immutably.
4.  **Side Effect:** Zustand's `persist` middleware automatically syncs the new state to the browser's `localStorage`.
5.  **Re-render:** Subscribed React components automatically re-render with the new data.

## 3. Routing Strategy
The application is split into two primary zones: **Public** and **Protected (Dashboard)**.

*   `Public Route: /` 
    *   Renders the `LandingPage`. Contains the Hero section and triggers the Dummy Auth Modal.
*   `Protected Route Wrapper: /dashboard`
    *   Requires a `user` object in the Zustand store. If none exists, redirects to `/`.
    *   Wraps children in the `DashboardLayout` (Sidebar + Topbar).
    *   **Sub-routes:**
        *   `/dashboard/overview` (Default)
        *   `/dashboard/transactions`
        *   `/dashboard/insights`

## 4. Role-Based Access Control (RBAC) Flow
*   The application implements a "Frontend RBAC Simulation".
*   Role state (`"admin" | "viewer"`) lives globally.
*   **Component Level Verification:** Instead of blocking entire routes, the application uses a custom hook/wrapper (e.g., `useRole()`) to conditionally render elements:
    *   `{role === 'admin' && <AddTransactionButton />}`
*   **Simulated Backend Delay:** When the role is toggled in the Header, a global `isLoading` state is triggered for 1.5 seconds. During this, the UI mounts `Skeleton` components. Once `isLoading` is false, the UI re-mounts with the new role rules applied.
