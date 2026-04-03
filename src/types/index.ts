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
