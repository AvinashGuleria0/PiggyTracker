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
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
  },
  {
    id: "2",
    title: "Grocery Run",
    amount: 125.50,
    type: "expense",
    category: "Food",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
  },
  {
    id: "3",
    title: "Netflix Subscription",
    amount: 15.99,
    type: "expense",
    category: "Entertainment",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  },
  {
    id: "4",
    title: "Apartment Rent",
    amount: 1200,
    type: "expense",
    category: "Housing",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.5).toISOString(), // 1.5 days ago
  },
  {
    id: "5",
    title: "Freelance Client",
    amount: 850,
    type: "income",
    category: "Side Hustle",
    date: new Date().toISOString(), // Today
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
