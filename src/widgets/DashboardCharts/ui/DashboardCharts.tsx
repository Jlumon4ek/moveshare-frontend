import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import cn from 'classnames';

// --- Данные для графика "Monthly Earnings" ---
const earningsData = [
  { name: 'Jan', earnings: 6500 },
  { name: 'Feb', earnings: 7200 },
  { name: 'Mar', earnings: 7800 },
  { name: 'Apr', earnings: 8100 },
  { name: 'May', earnings: 7900 },
  { name: 'Jun', earnings: 8400 },
];

// --- Данные для графика "Job Status Distribution" ---
const statusData = [
  { name: 'Completed', value: 400 },
  { name: 'In Progress', value: 150 },
  { name: 'Scheduled', value: 300 },
  { name: 'Available', value: 100 },
];
const COLORS = ['#84CC16', '#3B82F6', '#A855F7', '#F97316'];

export const DashboardCharts = () => {
    const [timeRange, setTimeRange] = useState('Monthly');

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Monthly Earnings Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Monthly Earnings</h3>
                    <div className="flex items-center bg-gray-100 rounded-lg p-1 text-sm">
                        {['Monthly', 'Quarterly', 'Annual'].map(range => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={cn('px-3 py-1 rounded-md transition-colors', {
                                    'bg-white shadow-sm text-primary font-semibold': timeRange === range,
                                    'text-gray-500 hover:text-gray-800': timeRange !== range,
                                })}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={earningsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                            <Tooltip cursor={{fill: 'rgba(243, 244, 246, 0.5)'}}/>
                            <Bar dataKey="earnings" radius={[4, 4, 0, 0]}>
                                {earningsData.map((_entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === earningsData.length - 1 ? '#84CC16' : '#60A5FA'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Job Status Distribution Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                 <h3 className="text-lg font-bold text-gray-800 mb-4">Job Status Distribution</h3>
                 <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={110}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {statusData.map((_entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="flex justify-center items-center gap-4 flex-wrap mt-4 text-sm">
                     {statusData.map((entry, index) => (
                         <div key={entry.name} className="flex items-center gap-2">
                             <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                             <span className="text-gray-600">{entry.name}</span>
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    );
}