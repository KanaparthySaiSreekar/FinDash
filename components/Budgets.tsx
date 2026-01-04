import React from 'react';
import { Budget } from '../types';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface BudgetsProps {
  budgets: Budget[];
}

const Budgets: React.FC<BudgetsProps> = ({ budgets }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Budgets</h2>
          <p className="text-slate-500">Track your monthly spending limits.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {budgets.map((budget) => {
          const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
          const isOver = budget.spent > budget.limit;
          const colorClass = isOver ? 'bg-rose-500' : percentage > 80 ? 'bg-amber-500' : 'bg-emerald-500';
          
          return (
            <div key={budget.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-10 rounded-full ${colorClass}`}></div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">{budget.category}</h3>
                    <p className="text-sm text-slate-500">{budget.period} Budget</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">
                    ${budget.spent.toLocaleString()} 
                    <span className="text-slate-400 text-lg font-normal"> / ${budget.limit.toLocaleString()}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className={`font-medium ${isOver ? 'text-rose-600' : 'text-slate-600'}`}>
                    {percentage.toFixed(0)}% Used
                  </span>
                  <span className="text-slate-500">
                    ${Math.max(budget.limit - budget.spent, 0).toLocaleString()} Left
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${colorClass}`} 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>

              {isOver && (
                <div className="mt-4 flex items-center gap-2 text-rose-600 text-sm bg-rose-50 p-2 rounded-lg">
                  <AlertCircle size={16} />
                  You have exceeded your budget for this category.
                </div>
              )}
              {!isOver && percentage < 50 && (
                <div className="mt-4 flex items-center gap-2 text-emerald-600 text-sm bg-emerald-50 p-2 rounded-lg">
                  <CheckCircle size={16} />
                  You are well within your budget. Good job!
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Budgets;