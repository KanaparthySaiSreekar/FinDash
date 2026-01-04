export enum TransactionType {
  INCOME = 'Income',
  EXPENSE = 'Expense',
  TRANSFER = 'Transfer',
}

export interface Account {
  id: string;
  name: string;
  type: 'Checking' | 'Savings' | 'Credit Card' | 'Investment' | 'Cash';
  balance: number;
  currency: string;
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  date: string;
  payee: string;
  amount: number;
  type: TransactionType;
  category: string;
  accountId: string;
  status: 'posted' | 'pending';
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'Monthly' | 'Yearly';
}

export interface NetWorthPoint {
  date: string;
  assets: number;
  debts: number;
  netWorth: number;
}

export interface CategorySummary {
  name: string;
  value: number;
  color: string;
}

export interface StockHolding {
  symbol: string;
  name: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  change24h: number; // percentage
}