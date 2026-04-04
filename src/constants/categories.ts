export const TRANSACTION_CATEGORIES = {
  income: ['Salary', 'Side Hustle', 'Freelance', 'Bonus', 'Investment', 'Other'] as const,
  expense: ['Food', 'Rent', 'Entertainment', 'Housing', 'Utilities', 'Other'] as const,
} as const;

export type IncomeCategory = (typeof TRANSACTION_CATEGORIES.income)[number];
export type ExpenseCategory = (typeof TRANSACTION_CATEGORIES.expense)[number];
export type TransactionCategory = IncomeCategory | ExpenseCategory;

/**
 * Get available categories based on transaction type
 * Usage: getCategoriesByType('income') → ['Salary', 'Side Hustle', ...]
 */
export function getCategoriesByType(type: 'income' | 'expense' | 'all') {
  if (type === 'all') {
    return [...TRANSACTION_CATEGORIES.income, ...TRANSACTION_CATEGORIES.expense] as const;
  }
  return TRANSACTION_CATEGORIES[type];
}
