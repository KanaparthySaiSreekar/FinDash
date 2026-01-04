import React from 'react';
import { StockHolding } from '../types';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, Tooltip, Legend } from 'recharts';

interface InvestmentsProps {
  holdings: StockHolding[];
}

const Investments: React.FC<InvestmentsProps> = ({ holdings }) => {
  const totalValue = holdings.reduce((sum, stock) => sum + (stock.shares * stock.currentPrice), 0);
  const totalCost = holdings.reduce((sum, stock) => sum + (stock.shares * stock.avgCost), 0);
  const totalGain = totalValue - totalCost;
  const totalGainPercent = (totalGain / totalCost) * 100;

  // Colors for the pie chart
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  const chartData = holdings.map((stock) => ({
    name: stock.symbol,
    value: stock.shares * stock.currentPrice,
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Investments</h2>
          <p className="text-slate-500">Track your stock portfolio and performance.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Market Open
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-500 text-sm font-medium">Portfolio Value</h3>
            <div className="p-2 bg-blue-50 rounded-lg">
              <DollarSign className="text-blue-600" size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-500 text-sm font-medium">Total Return</h3>
            <div className={`p-2 rounded-lg ${totalGain >= 0 ? 'bg-emerald-50' : 'bg-rose-50'}`}>
              {totalGain >= 0 ? (
                <TrendingUp className="text-emerald-600" size={20} />
              ) : (
                <TrendingDown className="text-rose-600" size={20} />
              )}
            </div>
          </div>
          <div className="flex items-end gap-2">
            <p className={`text-3xl font-bold ${totalGain >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {totalGain >= 0 ? '+' : ''}{totalGain.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <p className={`text-sm font-semibold mb-1 ${totalGain >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              ({totalGainPercent.toFixed(2)}%)
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-500 text-sm font-medium">Top Performer</h3>
            <div className="p-2 bg-purple-50 rounded-lg">
                <PieChart className="text-purple-600" size={20} />
            </div>
            </div>
             {(() => {
                const top = [...holdings].sort((a, b) => b.change24h - a.change24h)[0];
                return top ? (
                    <div>
                        <p className="text-xl font-bold text-slate-900">{top.symbol}</p>
                        <p className={`text-sm font-medium ${top.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {top.change24h > 0 ? '+' : ''}{top.change24h}% Today
                        </p>
                    </div>
                ) : <p>-</p>
             })()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Holdings Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Holdings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Symbol</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Price</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Shares</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Value</th>
                  <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Return</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {holdings.map((stock) => {
                    const marketValue = stock.shares * stock.currentPrice;
                    const gain = marketValue - (stock.shares * stock.avgCost);
                    const gainPercent = (gain / (stock.shares * stock.avgCost)) * 100;
                    
                    return (
                        <tr key={stock.symbol} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="font-bold text-slate-900">{stock.symbol}</span>
                                    <span className="text-xs text-slate-500">{stock.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="text-sm font-medium text-slate-900">${stock.currentPrice.toFixed(2)}</div>
                                <div className={`text-xs ${stock.change24h >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {stock.change24h > 0 ? '+' : ''}{stock.change24h}%
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right text-sm text-slate-700">
                                {stock.shares}
                            </td>
                            <td className="px-6 py-4 text-right text-sm font-semibold text-slate-900">
                                ${marketValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className={`text-sm font-medium ${gain >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {gain >= 0 ? '+' : ''}${gain.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                                <div className={`text-xs ${gain >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {gainPercent.toFixed(1)}%
                                </div>
                            </td>
                        </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Allocation Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Allocation</h3>
            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                    <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value: number) => `$${value.toLocaleString()}`}
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E2E8F0' }}
                    />
                    <Legend />
                </RechartsPie>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Investments;