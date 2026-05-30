import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

const BAR_COLORS = ['#00FF41', '#00D936', '#00B82E', '#009925', '#00801E', '#006618', '#004D12'];

const TOOLTIP_STYLE = {
  background: '#0A0F0A',
  border: '1px solid #1A3A1A',
  padding: '8px 12px',
  fontFamily: "'Fira Code', monospace",
};
const TOOLTIP_LABEL_STYLE = {
  fontSize: 9, letterSpacing: '0.15em', color: '#155226',
  textTransform: 'uppercase', marginBottom: 4,
};
const TOOLTIP_VALUE_STYLE = { fontSize: 14, color: '#00FF41' };

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={TOOLTIP_STYLE}>
      <div style={TOOLTIP_LABEL_STYLE}>{label}</div>
      <div style={TOOLTIP_VALUE_STYLE}>${payload[0].value.toLocaleString()}</div>
    </div>
  );
}

function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const cat = t.category;
      acc[cat] = (acc[cat] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory)
    .map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Math.round(value * 100) / 100,
    }))
    .sort((a, b) => b.value - a.value);

  if (data.length === 0) return null;

  const ariaLabel = `Bar chart: spending by category. ${data.map(d => `${d.name}: $${d.value}`).join(', ')}.`;

  return (
    <div className="spending-chart" role="img" aria-label={ariaLabel}>
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A3A1A" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#2A7A3B', fontFamily: "'Fira Code', monospace" }}
            axisLine={{ stroke: '#1A3A1A' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fontSize: 11, fill: '#2A7A3B', fontFamily: "'Fira Code', monospace" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 255, 65, 0.04)' }} />
          <Bar dataKey="value" radius={[2, 2, 0, 0]} maxBarSize={56}>
            {data.map((entry, i) => (
              <Cell key={entry.name} fill={BAR_COLORS[i % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
