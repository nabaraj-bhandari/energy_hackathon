"use client";

import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar } from 'lucide-react';
import { generateHistoricalData } from '@/app/lib/data';

type TimeRange = 'today' | 'yesterday' | 'week';

export default function HistoricalData() {
    const [timeRange, setTimeRange] = useState<TimeRange>('today');

    const getHistoricalData = () => {
        switch (timeRange) {
            case 'today':
                return generateHistoricalData(0);
            case 'yesterday':
                return generateHistoricalData(1).slice(0, 24);
            case 'week':
                return generateHistoricalData(7);
        }
    };

    const data = getHistoricalData();

    const peakVsOffPeakData = [
        { name: 'Peak Hours', value: data.filter(d => d.isPeak).reduce((sum, d) => sum + d.load, 0), color: '#ef4444' },
        { name: 'Off-Peak Hours', value: data.filter(d => !d.isPeak).reduce((sum, d) => sum + d.load, 0), color: '#22c55e' },
    ];

    const loadByDevice = [
        { device: 'AC Unit', energy: 14.2 },
        { device: 'Water Heater', energy: 12.5 },
        { device: 'Washing Machine', energy: 4.8 },
        { device: 'Refrigerator', energy: 8.6 },
        { device: 'TV', energy: 2.9 },
        { device: 'Others', energy: 6.2 },
    ];

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return timeRange === 'week' ? date.toLocaleDateString() : date.getHours() + ':00';
    };

    return (
        <div className="backdrop-blur-md bg-gray-900/50 rounded-2xl border border-gray-700/50 p-6 mb-8">
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-2xl font-bold text-white">Historical Data</h2>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div className="flex gap-2">
                            <button
                                onClick={() => setTimeRange('today')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timeRange === 'today'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                Today
                            </button>
                            <button
                                onClick={() => setTimeRange('yesterday')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timeRange === 'yesterday'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                Yesterday
                            </button>
                            <button
                                onClick={() => setTimeRange('week')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timeRange === 'week'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                Last 7 Days
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="backdrop-blur-md bg-gray-800/50 rounded-xl border border-gray-700/50 p-5">
                    <h3 className="text-white font-semibold mb-4">Power vs Time</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={data.filter((_, i) => i % (timeRange === 'week' ? 4 : 1) === 0)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="timestamp" tickFormatter={formatTime} stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                                labelStyle={{ color: '#fff' }}
                            />
                            <Line type="monotone" dataKey="load" stroke="#3b82f6" strokeWidth={2} dot={false} name="Load (kW)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="backdrop-blur-md bg-gray-800/50 rounded-xl border border-gray-700/50 p-5">
                    <h3 className="text-white font-semibold mb-4">Peak vs Off-Peak Usage</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={peakVsOffPeakData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {peakVsOffPeakData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="backdrop-blur-md bg-gray-800/50 rounded-xl border border-gray-700/50 p-5">
                    <h3 className="text-white font-semibold mb-4">Battery SOC vs Time</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={data.filter((_, i) => i % (timeRange === 'week' ? 4 : 1) === 0)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="timestamp" tickFormatter={formatTime} stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                                labelStyle={{ color: '#fff' }}
                            />
                            <Line type="monotone" dataKey="batterySOC" stroke="#22c55e" strokeWidth={2} dot={false} name="Battery (%)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="backdrop-blur-md bg-gray-800/50 rounded-xl border border-gray-700/50 p-5">
                    <h3 className="text-white font-semibold mb-4">Load-wise Energy Consumption</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={loadByDevice}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="device" stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                                labelStyle={{ color: '#fff' }}
                            />
                            <Bar dataKey="energy" fill="#3b82f6" name="Energy (kWh)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
