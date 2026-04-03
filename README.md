# PiggyTracker

PiggyTracker is a modern, Neo-Brutalism styled internal dashboard for personal finance tracking. Built as a Client-Side SPA using React 18, Vite, and Zustand, it serves as a lightweight system for logging, reviewing, and analyzing financial transactions without needing a backend.

## Features
- **Neo-Brutalist Theme:** Hard shadows, thick dark borders, stark transitions, and high-contrast color palettes.
- **Client-Side Storage**: Everything persists in your browser's LocalStorage instantly via Zustand.
- **Overview Dashboard**: Quick card overviews, recent transactions log, and an interactive Area Chart tracking your cumulative balance timeline.
- **Transactions Hub**: Add, edit, or delete transactions. Includes deep filtering (Type, Category, Date, and text Search) and a mock CSV export utility.
- **Financial Insights**: Pie and Bar charts generated directly from your transaction store giving you a breakdown of spending categories and a monthly cash-flow comparison.
- **Role-Based Views**: Mocked login simulating two users (`admin` & `viewer`). Admin can edit/add/delete transactions, while viewers can only review the data.

## Technology Stack
- **React 18** under **Vite** for fast, optimized compilation.
- **Tailwind CSS v4** + heavily modified **shadcn/ui** for styling and CSS variables.
- **Zustand** for state management (`persist` middleware to `localStorage`).
- **Recharts** for SVG-based reactive charting.
- **Lucide React** & **Dicebear** for icons and avatars.
- **React-Toastify** for alerts and UI notifications.

## Requirements
Ensure you have **Node.js** (>= 20) and **npm** installed on your system.

## Setup & Running
1. **Clone the repository.**
2. **Install dependencies**.
   ```bash
   npm install
   ```
3. **Start the local development server.**
   ```bash
   npm run dev
   ```
4. Access the web app at `http://localhost:5173`. 

## Development Guidelines
- The app utilizes strict TypeScript declarations (`import type { Transaction }`). Ensure imports cleanly separate types from values to prevent Vite compilation issues.
- All styles strictly follow the Neo-Brutalist aesthetic. Do not use soft box-shadows. Shadows should be exact properties such as: `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`.
- The `useAppStore.ts` file acts as the primary database handler and auth handler.

## License
MIT License.
