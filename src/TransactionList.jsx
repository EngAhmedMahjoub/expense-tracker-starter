import { useState } from 'react'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filtered = transactions;
  if (filterType !== "all") filtered = filtered.filter(t => t.type === filterType);
  if (filterCategory !== "all") filtered = filtered.filter(t => t.category === filterCategory);

  return (
    <div className="transactions">
      <div className="transactions-header">
        <h2>Transactions</h2>
        <div className="filters">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan={5} className="empty-state">No transactions found</td></tr>
          ) : (
            filtered.map(t => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.description}</td>
                <td><span className="badge">{t.category}</span></td>
                <td>
                  <span className={`amount ${t.type}`}>
                    {t.type === 'income' ? '+' : '−'}${parseFloat(t.amount).toFixed(2)}
                  </span>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    title="Delete transaction"
                    onClick={() => {
                      if (window.confirm('Delete this transaction?')) onDelete(t.id);
                    }}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
