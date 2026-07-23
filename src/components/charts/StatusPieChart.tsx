import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { ChartData } from '@/types';

interface StatusPieChartProps {
  data: ChartData[];
}

export function StatusPieChart({ data }: StatusPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.fill || '#3B82F6'} />
          ))}
        </Pie>
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
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value: string) => (
            <span className="text-xs text-slate-600 dark:text-slate-400">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
