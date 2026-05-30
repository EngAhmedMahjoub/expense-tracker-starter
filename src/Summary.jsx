function fmt(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div className="summary-card">
        <h3>Income</h3>
        <p className="stat-value income">${fmt(totalIncome)}</p>
      </div>
      <div className="summary-card">
        <h3>Expenses</h3>
        <p className="stat-value expense">${fmt(totalExpenses)}</p>
      </div>
      <div className="summary-card">
        <h3>Balance</h3>
        <p className={`stat-value balance${balance < 0 ? ' negative' : ''}`}>
          {balance < 0 ? '-' : ''}${fmt(Math.abs(balance))}
        </p>
      </div>
    </div>
  );
}

export default Summary;
