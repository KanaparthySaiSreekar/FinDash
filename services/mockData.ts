import { Account, Budget, CategorySummary, NetWorthPoint, StockHolding, Transaction, TransactionType } from '../types';

const ACCOUNTS: Account[] = [
  { id: '1', name: 'Chase Checking', type: 'Checking', balance: 4250.50, currency: 'USD', lastUpdated: '2023-10-25' },
  { id: '2', name: 'Amex Gold', type: 'Credit Card', balance: -1240.20, currency: 'USD', lastUpdated: '2023-10-26' },
  { id: '3', name: 'Fidelity Cash Core', type: 'Investment', balance: 5000.00, currency: 'USD', lastUpdated: '2023-10-24' },
  { id: '4', name: 'High Yield Savings', type: 'Savings', balance: 22000.00, currency: 'USD', lastUpdated: '2023-10-20' },
  { id: '5', name: 'Wallet Cash', type: 'Cash', balance: 120.00, currency: 'USD', lastUpdated: '2023-10-27' },
];

const TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2023-10-27', payee: 'Whole Foods Market', amount: 145.20, type: TransactionType.EXPENSE, category: 'Groceries', accountId: '2', status: 'posted' },
  { id: '2', date: '2023-10-26', payee: 'Shell Station', amount: 45.00, type: TransactionType.EXPENSE, category: 'Transport', accountId: '2', status: 'posted' },
  { id: '3', date: '2023-10-25', payee: 'Tech Corp Inc.', amount: 4200.00, type: TransactionType.INCOME, category: 'Salary', accountId: '1', status: 'posted' },
  { id: '4', date: '2023-10-24', payee: 'Netflix', amount: 15.99, type: TransactionType.EXPENSE, category: 'Entertainment', accountId: '2', status: 'posted' },
  { id: '5', date: '2023-10-23', payee: 'Starbucks', amount: 6.50, type: TransactionType.EXPENSE, category: 'Dining', accountId: '2', status: 'posted' },
  { id: '6', date: '2023-10-22', payee: 'Electric Company', amount: 120.40, type: TransactionType.EXPENSE, category: 'Utilities', accountId: '1', status: 'posted' },
  { id: '7', date: '2023-10-21', payee: 'Target', amount: 89.99, type: TransactionType.EXPENSE, category: 'Shopping', accountId: '2', status: 'posted' },
  { id: '8', date: '2023-10-20', payee: 'Transfer to Savings', amount: 1000.00, type: TransactionType.TRANSFER, category: 'Transfer', accountId: '1', status: 'posted' },
  { id: '9', date: '2023-10-19', payee: 'Uber', amount: 24.50, type: TransactionType.EXPENSE, category: 'Transport', accountId: '2', status: 'posted' },
  { id: '10', date: '2023-10-18', payee: 'Spotify', amount: 9.99, type: TransactionType.EXPENSE, category: 'Entertainment', accountId: '2', status: 'posted' },
  { id: '11', date: '2023-10-15', payee: 'Trader Joes', amount: 67.30, type: TransactionType.EXPENSE, category: 'Groceries', accountId: '2', status: 'posted' },
  { id: '12', date: '2023-10-12', payee: 'Amazon AWS', amount: 35.00, type: TransactionType.EXPENSE, category: 'Services', accountId: '2', status: 'posted' },
];

const BUDGETS: Budget[] = [
  { id: '1', category: 'Groceries', limit: 600, spent: 450, period: 'Monthly' },
  { id: '2', category: 'Dining', limit: 400, spent: 380, period: 'Monthly' },
  { id: '3', category: 'Entertainment', limit: 100, spent: 25.98, period: 'Monthly' },
  { id: '4', category: 'Transport', limit: 200, spent: 145, period: 'Monthly' },
  { id: '5', category: 'Shopping', limit: 300, spent: 120, period: 'Monthly' },
];

const NET_WORTH_HISTORY: NetWorthPoint[] = [
  { date: 'Jun', assets: 102000, debts: 1500, netWorth: 100500 },
  { date: 'Jul', assets: 104500, debts: 1200, netWorth: 103300 },
  { date: 'Aug', assets: 106000, debts: 2000, netWorth: 104000 },
  { date: 'Sep', assets: 105500, debts: 1100, netWorth: 104400 },
  { date: 'Oct', assets: 111370, debts: 1240, netWorth: 110130 },
];

const SPENDING_BY_CATEGORY: CategorySummary[] = [
  { name: 'Groceries', value: 450, color: '#10B981' }, // Emerald 500
  { name: 'Dining', value: 380, color: '#3B82F6' },    // Blue 500
  { name: 'Housing', value: 1200, color: '#6366F1' },  // Indigo 500
  { name: 'Transport', value: 145, color: '#F59E0B' }, // Amber 500
  { name: 'Utilities', value: 120, color: '#EF4444' }, // Red 500
  { name: 'Others', value: 150, color: '#9CA3AF' },    // Gray 400
];

const STOCK_HOLDINGS: StockHolding[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, avgCost: 145.00, currentPrice: 178.35, change24h: 1.25 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 30, avgCost: 280.50, currentPrice: 335.50, change24h: -0.45 },
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', shares: 85, avgCost: 380.00, currentPrice: 420.10, change24h: 0.85 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', shares: 25, avgCost: 240.00, currentPrice: 215.60, change24h: -2.30 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 40, avgCost: 110.00, currentPrice: 138.50, change24h: 1.10 },
];

export const mockService = {
  getAccounts: async (): Promise<Account[]> => {
    return new Promise(resolve => setTimeout(() => resolve(ACCOUNTS), 600));
  },
  getTransactions: async (): Promise<Transaction[]> => {
    return new Promise(resolve => setTimeout(() => resolve(TRANSACTIONS), 500));
  },
  getBudgets: async (): Promise<Budget[]> => {
    return new Promise(resolve => setTimeout(() => resolve(BUDGETS), 400));
  },
  getNetWorthHistory: async (): Promise<NetWorthPoint[]> => {
    return new Promise(resolve => setTimeout(() => resolve(NET_WORTH_HISTORY), 700));
  },
  getSpendingByCategory: async (): Promise<CategorySummary[]> => {
    return new Promise(resolve => setTimeout(() => resolve(SPENDING_BY_CATEGORY), 700));
  },
  getStocks: async (): Promise<StockHolding[]> => {
    return new Promise(resolve => setTimeout(() => resolve(STOCK_HOLDINGS), 600));
  }
};