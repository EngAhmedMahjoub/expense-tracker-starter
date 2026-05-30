import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const TOOLTIP_STYLE = {
  background: '#16161d',
  border: '1px solid #1e1e28',
  borderRadius: '3px',
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '11px',
  color: '#ddd8ce',
  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
};

function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory)
    .map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Math.round(value * 100) / 100,
    }))
    .sort((a, b) => b.value - a.value);

  if (data.length === 0) return null;

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e1e28" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: '#52525e', fontFamily: "'JetBrains Mono', monospace", fontWeight: 400 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fontSize: 10, fill: '#52525e', fontFamily: "'JetBrains Mono', monospace", fontWeight: 400 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => [`$${value.toFixed(2)}`, 'Spent']}
            contentStyle={TOOLTIP_STYLE}
            cursor={{ fill: 'rgba(196, 151, 58, 0.05)' }}
          />
          <Bar dataKey="value" fill="#c4973a" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
