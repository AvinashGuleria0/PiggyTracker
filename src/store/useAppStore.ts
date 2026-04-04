import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Role, Transaction, FilterState } from '../types';

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

const initialTransactions: Transaction[] = [
  {
    id: "1",
    title: "Salary Setup",
    amount: 3500,
    type: "income",
    category: "Salary",
    // 25 Mar 2026 at 2:00 PM IST (08:30 UTC)
    date: new Date(Date.UTC(2026, 2, 25, 8, 30, 0)).toISOString(),
  },
  {
    id: "2",
    title: "Grocery Run",
    amount: 125.50,
    type: "expense",
    category: "Food",
    // 30 Mar 2026 at 5:15 AM IST (23:45 UTC previous day)
    date: new Date(Date.UTC(2026, 2, 29, 23, 45, 0)).toISOString(),
  },
  {
    id: "3",
    title: "Netflix Subscription",
    amount: 15.99,
    type: "expense",
    category: "Entertainment",
    // 2 Apr 2026 at 11:45 PM IST (18:15 UTC)
    date: new Date(Date.UTC(2026, 3, 2, 18, 15, 0)).toISOString(),
  },
  {
    id: "4",
    title: "Apartment Rent",
    amount: 1200,
    type: "expense",
    category: "Housing",
    // 3 Apr 2026 at 7:30 AM IST (02:00 UTC)
    date: new Date(Date.UTC(2026, 3, 3, 2, 0, 0)).toISOString(),
  },
  {
    id: "5",
    title: "Freelance Client",
    amount: 850,
    type: "income",
    category: "Side Hustle",
    // 4 Apr 2026 at 6:00 PM IST (12:30 UTC)
    date: new Date(Date.UTC(2026, 3, 4, 12, 30, 0)).toISOString(),
  },
];

const initialFilters: FilterState = {
  searchQuery: "",
  category: "all",
  type: "all",
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      transactions: initialTransactions,
      filters: initialFilters,
      isSwitchingRole: false,

      login: (name, role) => set({ 
        user: { name, role, avatarSeed: name } 
      }),
      
      logout: () => set({ user: null }),
      
      switchRole: async (newRole) => {
        set({ isSwitchingRole: true });
        
        // Simulate a 1.5s network/backend delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        set((state) => ({
          user: state.user ? { ...state.user, role: newRole } : null,
          isSwitchingRole: false,
        }));
      },

      addTransaction: (tx) => set((state) => ({
        transactions: [{ ...tx, id: crypto.randomUUID() }, ...state.transactions],
      })),

      updateTransaction: (id, updatedTx) => set((state) => ({
        transactions: state.transactions.map((tx) =>
          tx.id === id ? { ...tx, ...updatedTx } : tx
        ),
      })),

      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((tx) => tx.id !== id),
      })),

      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters },
      })),
    }),
    {
      name: "piggy-tracker-storage",
      partialize: (state) => ({
        user: state.user,
        transactions: state.transactions,
        filters: state.filters,
        // isSwitchingRole is NOT persisted - always starts as false
      }),
    }
  )
);

// --- Transaction Selectors ---
export const selectIncome = (state: AppState) =>
  state.transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

export const selectExpense = (state: AppState) =>
  state.transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

export const selectBalance = (state: AppState) => {
  const income = selectIncome(state);
  const expense = selectExpense(state);
  return income - expense;
};
