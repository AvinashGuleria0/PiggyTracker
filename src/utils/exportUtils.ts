import type { Transaction } from "../types";

export const exportToCSV = (transactions: Transaction[]) => {
  if (!transactions.length) return;

  const headers = ["ID", "Title", "Amount", "Type", "Category", "Date"];
  
  const csvRows = transactions.map(tx => [
    tx.id,
    `"${tx.title.replace(/"/g, '""')}"`,
    tx.amount.toFixed(2),
    tx.type,
    `"${tx.category}"`,
    new Date(tx.date).toLocaleDateString()
  ].join(","));

  const csvContent = [headers.join(","), ...csvRows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `piggytracker_export_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};