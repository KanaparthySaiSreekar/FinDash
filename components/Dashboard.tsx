import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Account, CategorySummary, NetWorthPoint } from '../types';
import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet, TrendingUp } from 'lucide-react';

interface DashboardProps {
  accounts: Account[];
  netWorthHistory: NetWorthPoint[];
  categorySpending: CategorySummary[];
  totalNetWorth: number;
  stockPortfolioValue: number;
}

const Dashboard: React.FC<DashboardProps> = ({ accounts, netWorthHistory, categorySpending, totalNetWorth, stockPortfolioValue }) => {
  
  const cashAssets = accounts
    .filter(a => a.balance > 0)
    .reduce((acc, curr) => acc + curr.balance, 0);

  const totalAssets = cashAssets + stockPortfolioValue;

  const totalDebts = accounts
    .filter(a => a.balance < 0)
    .reduce((acc, curr) => acc + Math.abs(curr.balance), 0);

  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-sm font-medium">Total Net Worth</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Wallet className="text-blue-600" size={20} />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-slate-900">
              ${totalNetWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="flex items-center text-emerald-600 text-sm font-medium bg-emerald-50 px-2 py-1 rounded">
              <ArrowUpRight size={14} className="mr-1" />
              +3.2%
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-sm font-medium">Total Assets</h3>
            <div className="p-2 bg-emerald-50 rounded-lg">
              <DollarSign className="text-emerald-600" size={20} />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-slate-900">
              ${totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-slate-400 text-xs">Cash: ${(cashAssets).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                <span className="text-slate-300 text-xs">•</span>
                <span className="text-emerald-600 text-xs font-medium flex items-center">
                    <TrendingUp size={10} className="mr-1"/>
                    Stocks: ${(stockPortfolioValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-sm font-medium">Total Debts</h3>
            <div className="p-2 bg-rose-50 rounded-lg">
              <ArrowDownRight className="text-rose-600" size={20} />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-slate-900">
              ${totalDebts.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-slate-400 text-xs mb-1">Credit Cards & Loans</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Net Worth Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Net Worth Progression</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={netWorthHistory}>
                <defs>
                  <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Net Worth']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="netWorth" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorNetWorth)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Spending Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Spending by Category (This Month)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySpending}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                />
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  wrapperStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;