import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface TechnicianBarChartProps {
  data: { name: string; jobsCompleted: number; avgRating: number }[];
}

export function TechnicianBarChart({ data }: TechnicianBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barSize={32}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis
          dataKey="name"
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
        <Bar
          dataKey="jobsCompleted"
          name="Jobs Completed"
          fill="#3B82F6"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
