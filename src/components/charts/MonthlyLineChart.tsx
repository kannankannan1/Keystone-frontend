import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface MonthlyLineChartProps {
  data: { month: string; completed: number; created: number }[];
}

export function MonthlyLineChart({ data }: MonthlyLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
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
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="completed"
          name="Completed"
          stroke="#3B82F6"
          strokeWidth={2.5}
          dot={{ r: 4, fill: '#3B82F6' }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="created"
          name="Created"
          stroke="#6366F1"
          strokeWidth={2.5}
          dot={{ r: 4, fill: '#6366F1' }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
