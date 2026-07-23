import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SLAAreaChartProps {
  data: { month: string; compliance: number }[];
}

export function SLAAreaChart({ data }: SLAAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="slaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[80, 100]}
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: 'none',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '13px',
            padding: '10px 14px',
          }}
          formatter={(value) => [`${value}%`, 'SLA Compliance']}
        />
        <Area
          type="monotone"
          dataKey="compliance"
          stroke="#10B981"
          strokeWidth={2}
          fill="url(#slaGrad)"
          name="SLA Compliance"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
