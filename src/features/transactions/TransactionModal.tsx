import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'react-toastify';
import type { Transaction } from '@/types';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction; // if edit
}

export function TransactionModal({ isOpen, onClose, transaction }: TransactionModalProps) {
  const { addTransaction, updateTransaction } = useAppStore();
  
  const [formData, setFormData] = useState({
    title: transaction?.title || '',
    amount: transaction?.amount || '',
    category: transaction?.category || 'Food',
    date: transaction?.date || new Date().toISOString().split('T')[0],
    type: transaction?.type || 'expense',
  });

  const expenseCategories = ['Food', 'Rent', 'Entertainment', 'Housing', 'Utilities', 'Other'];
  const incomeCategories = ['Salary', 'Side Hustle', 'Freelance', 'Bonus', 'Investment', 'Other'];
  
  const categories = formData.type === 'income' ? incomeCategories : expenseCategories;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) {
      toast.error('Title and Amount are required.', { className: 'border-2 border-border shadow-neo' });
      return;
    }

    const payload = {
      id: transaction?.id || crypto.randomUUID(),
      title: formData.title,
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date,
      type: formData.type as 'income' | 'expense',
    };

    if (transaction) {
      updateTransaction(transaction.id, payload);
      toast.success('Transaction Updated!', { className: 'border-2 border-border shadow-neo' });
    } else {
      addTransaction(payload);
      toast.success('Transaction Added!', { className: 'border-2 border-border shadow-neo' });
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{transaction ? 'Edit Transaction' : 'Add New Transaction'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-bold">Title</label>
            <Input 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              placeholder="e.g. Groceries"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold">Amount ($)</label>
              <Input 
                type="number" 
                step="0.01"
                value={formData.amount} 
                onChange={e => setFormData({...formData, amount: e.target.value})} 
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Date</label>
              <Input 
                type="date" 
                value={formData.date} 
                onChange={e => setFormData({...formData, date: e.target.value})} 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold">Type</label>
              <select 
                className="flex h-10 w-full  border-2 border-border bg-background px-3 py-2 text-sm shadow-neo focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.type}
                onChange={e => {
                  const newType = e.target.value as 'income' | 'expense';
                  const newCategories = newType === 'income' ? incomeCategories : expenseCategories;
                  setFormData({...formData, type: newType, category: newCategories[0]});
                }}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Category</label>
              <select 
                className="flex h-10 w-full  border-2 border-border bg-background px-3 py-2 text-sm shadow-neo focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}