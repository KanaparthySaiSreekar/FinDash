import React, { useState } from 'react';
import { Account } from '../types';
import { Plus, CreditCard, Landmark, Banknote, Briefcase } from 'lucide-react';

interface AccountsProps {
  accounts: Account[];
}

const Accounts: React.FC<AccountsProps> = ({ accounts }) => {
  const [showAddModal, setShowAddModal] = useState(false); // Mock modal state

  const getAccountIcon = (type: Account['type']) => {
    switch(type) {
      case 'Checking':
      case 'Savings':
        return <Landmark size={24} className="text-blue-600" />;
      case 'Credit Card':
        return <CreditCard size={24} className="text-rose-600" />;
      case 'Investment':
        return <Briefcase size={24} className="text-emerald-600" />;
      case 'Cash':
        return <Banknote size={24} className="text-amber-600" />;
      default:
        return <Landmark size={24} className="text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Accounts</h2>
          <p className="text-slate-500">Manage your connected bank accounts and manual balances.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(!showAddModal)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add Account
        </button>
      </div>

      {showAddModal && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full text-blue-600">
            <Plus size={20} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-900">Mock Action</h4>
            <p className="text-sm text-blue-700">
              This is a frontend demo. In a real implementation, this would open a Plaid Link modal or a form to add a manual account.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                {getAccountIcon(account.type)}
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full 
                ${account.type === 'Investment' ? 'bg-emerald-100 text-emerald-800' : 
                  account.type === 'Credit Card' ? 'bg-rose-100 text-rose-800' : 
                  'bg-slate-100 text-slate-800'}`}>
                {account.type}
              </span>
            </div>
            
            <div>
              <h3 className="text-slate-900 font-semibold text-lg">{account.name}</h3>
              <p className="text-slate-500 text-sm mb-4">Last updated: {account.lastUpdated}</p>
              
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900">
                  {account.currency === 'USD' ? '$' : account.currency}
                  {Math.abs(account.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
              
              {account.type === 'Credit Card' && (
                <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accounts;