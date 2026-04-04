import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'react-toastify';
import type { Transaction } from '@/types';
import { getCategoriesByType } from '@/constants/categories';
import { validateRequired, validateAmount, validateNotFutureDate, ValidationErrors } from '@/utils/validators';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction; // if edit
}

export function TransactionModal({ isOpen, onClose, transaction }: TransactionModalProps) {
  const { addTransaction, updateTransaction } = useAppStore();
  
  // Helper function to convert UTC ISO string back to datetime-local format (IST)
  const getDatetimeLocalValue = (isoString?: string) => {
    if (isoString) {
      const date = new Date(isoString);
      // Convert UTC to IST by adding 5:30
      const istOffsetMs = 5.5 * 60 * 60 * 1000;
      const istDate = new Date(date.getTime() + istOffsetMs);
      return istDate.toISOString().slice(0, 16);
    }
    // Return current time in IST
    const now = new Date();
    const istOffsetMs = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(now.getTime() + istOffsetMs);
    return istNow.toISOString().slice(0, 16);
  };
  
  const [formData, setFormData] = useState({
    title: transaction?.title || '',
    amount: transaction?.amount || '',
    category: transaction?.category || 'Food',
    date: getDatetimeLocalValue(transaction?.date),
    type: transaction?.type || 'expense',
  });

  const categories = getCategoriesByType(formData.type as 'income' | 'expense');
  
  // Get today's datetime in IST for the datetime-local max attribute
  const getTodayDatetime = () => {
    const now = new Date();
    // Convert UTC now to IST by adding 5:30
    const istOffsetMs = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(now.getTime() + istOffsetMs);
    return istNow.toISOString().slice(0, 16);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRequired(formData.title)) {
      toast.error(ValidationErrors.REQUIRED_FIELD, { className: 'border-2 border-border shadow-neo' });
      return;
    }

    if (!validateAmount(formData.amount)) {
      toast.error(ValidationErrors.INVALID_AMOUNT, { className: 'border-2 border-border shadow-neo' });
      return;
    }

    // Parse datetime-local string to UTC properly
    // datetime-local format: "2026-04-04T15:30"
    const parts = formData.date.split('T');
    const [year, month, day] = parts[0].split('-').map(Number);
    const [hours, minutes] = parts[1].split(':').map(Number);
    
    // Create date in IST (by creating UTC date and adjusting)
    const istDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
    // Subtract 5:30 hours to convert IST to UTC
    const istOffsetMs = 5.5 * 60 * 60 * 1000;
    const utcDate = new Date(istDate.getTime() - istOffsetMs);
    
    // Validate that the datetime is not in the future
    if (!validateNotFutureDate(utcDate)) {
      toast.error(ValidationErrors.FUTURE_DATE, { className: 'border-2 border-border shadow-neo' });
      return;
    }

    const payload = {
      id: transaction?.id || crypto.randomUUID(),
      title: formData.title,
      amount: Number(formData.amount),
      category: formData.category,
      date: utcDate.toISOString(),
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
              <label className="text-sm font-bold">Amount (₹)</label>
              <Input 
                type="number" 
                step="0.01"
                value={formData.amount} 
                onChange={e => setFormData({...formData, amount: e.target.value})} 
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Date & Time</label>
              <Input 
                type="datetime-local" 
                value={formData.date} 
                onChange={e => setFormData({...formData, date: e.target.value})}
                max={getTodayDatetime()}
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
                  const newCategories = getCategoriesByType(newType);
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