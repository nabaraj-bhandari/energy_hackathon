"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { LoadDataPoint } from '@/app/lib/types';

interface LoadCurveGraphProps {
    data: LoadDataPoint[];
}

export default function LoadCurveGraph({ data }: LoadCurveGraphProps) {
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload as LoadDataPoint;
            return (
                <div className="backdrop-blur-md bg-gray-900/95 border border-gray-700 rounded-lg p-4 shadow-xl">
                    <p className="text-white font-semibold mb-2">{data.time}</p>
                    <p className="text-gray-300 text-sm">Load: <span className="text-white font-medium">{data.originalLoad} kW</span></p>
                    <p className="text-gray-300 text-sm">Optimized: <span className="text-green-400 font-medium">{data.optimizedLoad} kW</span></p>
                    <p className="text-gray-300 text-sm">Source: <span className="text-blue-400 font-medium capitalize">{data.source}</span></p>
                    <p className="text-gray-300 text-sm">Peak Hour: <span className={data.zone === 'peak' ? 'text-red-400' : 'text-green-400'}>{data.zone === 'peak' ? 'Yes' : 'No'}</span></p>
                    {data.savings > 0 && (
                        <p className="text-gray-300 text-sm">Savings: <span className="text-green-400 font-medium">{data.savings}%</span></p>
                    )}
                </div>
            );
        }
        return null;
    };

    const getZoneColor = (hour: number): string => {
        if (hour >= 0 && hour < 6) return 'rgba(34, 197, 94, 0.05)';
        if (hour >= 15 && hour <= 20) return 'rgba(239, 68, 68, 0.05)';
        return 'rgba(234, 179, 8, 0.05)';
    };

    return (
        <div className="backdrop-blur-md bg-gray-900/50 rounded-2xl border border-gray-700/50 p-6 mb-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Daily Load Curve (DSM Visualization)</h2>
                <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-green-500/20 border border-green-500"></div>
                        <span className="text-sm text-gray-300">Off-Peak (12 AM - 6 AM)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-yellow-500/20 border border-yellow-500"></div>
                        <span className="text-sm text-gray-300">Normal (6 AM - 3 PM)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500"></div>
                        <span className="text-sm text-gray-300">Peak (3 PM - 9 PM)</span>
                    </div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorOriginal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                        dataKey="time"
                        stroke="#9ca3af"
                        tick={{ fill: '#9ca3af' }}
                    />
                    <YAxis
                        stroke="#9ca3af"
                        tick={{ fill: '#9ca3af' }}
                        label={{ value: 'Power Demand (kW)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ color: '#fff' }}
                        iconType="line"
                    />
                    <Area
                        type="monotone"
                        dataKey="originalLoad"
                        stroke="#ef4444"
                        strokeWidth={2}
                        fill="url(#colorOriginal)"
                        name="Original Load"
                    />
                    <Area
                        type="monotone"
                        dataKey="optimizedLoad"
                        stroke="#22c55e"
                        strokeWidth={2}
                        fill="url(#colorOptimized)"
                        name="Optimized Load"
                    />
                </AreaChart>
            </ResponsiveContainer>types

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="backdrop-blur-md bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                    <div className="text-gray-400 text-sm">Peak Load</div>
                    <div className="text-2xl font-bold text-white">{Math.max(...data.map(d => d.originalLoad))} kW</div>
                </div>
                <div className="backdrop-blur-md bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                    <div className="text-gray-400 text-sm">Average Reduction</div>
                    <div className="text-2xl font-bold text-green-400">
                        {(data.filter(d => d.savings > 0).reduce((sum, d) => sum + d.savings, 0) / data.filter(d => d.savings > 0).length).toFixed(1)}%
                    </div>
                </div>
                <div className="backdrop-blur-md bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                    <div className="text-gray-400 text-sm">Peak Hours</div>
                    <div className="text-2xl font-bold text-red-400">3 PM - 9 PM</div>
                </div>
            </div>
        </div>
    );
}
