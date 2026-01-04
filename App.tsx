import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Accounts from './components/Accounts';
import Budgets from './components/Budgets';
import Investments from './components/Investments';
import { Account, Budget, CategorySummary, NetWorthPoint, StockHolding, Transaction } from './types';
import { mockService } from './services/mockData';
import { Menu, Upload } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Data State
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [netWorthHistory, setNetWorthHistory] = useState<NetWorthPoint[]>([]);
  const [categorySpending, setCategorySpending] = useState<CategorySummary[]>([]);
  const [stocks, setStocks] = useState<StockHolding[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [accs, txs, bgs, history, cats, stockHoldings] = await Promise.all([
          mockService.getAccounts(),
          mockService.getTransactions(),
          mockService.getBudgets(),
          mockService.getNetWorthHistory(),
          mockService.getSpendingByCategory(),
          mockService.getStocks()
        ]);
        
        setAccounts(accs);
        setTransactions(txs);
        setBudgets(bgs);
        setNetWorthHistory(history);
        setCategorySpending(cats);
        setStocks(stockHoldings);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const totalAccountBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalStockValue = stocks.reduce((sum, stock) => sum + (stock.shares * stock.currentPrice), 0);
  const totalNetWorth = totalAccountBalance + totalStockValue;

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard 
          accounts={accounts} 
          netWorthHistory={netWorthHistory} 
          categorySpending={categorySpending}
          totalNetWorth={totalNetWorth}
          stockPortfolioValue={totalStockValue}
        />;
      case 'transactions':
        return <Transactions transactions={transactions} />;
      case 'accounts':
        return <Accounts accounts={accounts} />;
      case 'investments':
        return <Investments holdings={stocks} />;
      case 'budgets':
        return <Budgets budgets={budgets} />;
      case 'import':
        return (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="text-blue-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Import Data</h2>
            <p className="text-slate-500 mb-6">Upload a CSV file from your bank to import transactions.</p>
            
            <label className="block w-full cursor-pointer">
              <input type="file" className="hidden" />
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 hover:bg-slate-50 transition-colors">
                <span className="text-blue-600 font-medium">Click to upload</span>
                <span className="text-slate-400"> or drag and drop</span>
                <p className="text-xs text-slate-400 mt-2">CSV files only, max 5MB</p>
              </div>
            </label>
          </div>
        );
      case 'settings':
        return (
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold mb-4">Application Settings</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-2 border-b border-slate-100">
                            <span className="text-slate-700">Currency</span>
                            <span className="text-slate-900 font-medium">USD ($)</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-slate-100">
                            <span className="text-slate-700">Theme</span>
                            <span className="text-slate-900 font-medium">Light</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-slate-700">Data Storage</span>
                            <span className="text-slate-900 font-medium">Local / Mock</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold mb-4 text-rose-600">Danger Zone</h3>
                    <button className="px-4 py-2 border border-rose-200 text-rose-600 rounded-lg hover:bg-rose-50 transition-colors">
                        Reset All Data
                    </button>
                </div>
            </div>
        );
      default:
        return <Dashboard 
          accounts={accounts} 
          netWorthHistory={netWorthHistory} 
          categorySpending={categorySpending}
          totalNetWorth={totalNetWorth}
          stockPortfolioValue={totalStockValue}
        />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between z-10">
          <h1 className="text-lg font-bold text-slate-900">FinanceDash</h1>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;