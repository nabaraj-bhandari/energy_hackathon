"use client";

import { Tv, Refrigerator, Fan, Lightbulb, WashingMachine, Flame, AirVent, Plug, AlertCircle } from 'lucide-react';
import { Device } from '@/app/lib/types';
import { useState } from 'react';

interface DeviceControlPanelProps {
    devices: Device[];
}

export default function DeviceControlPanel({ devices: initialDevices }: DeviceControlPanelProps) {
    const [devices, setDevices] = useState(initialDevices);

    const getDeviceIcon = (iconName: string) => {
        const icons: Record<string, any> = {
            tv: Tv,
            refrigerator: Refrigerator,
            fan: Fan,
            lightbulb: Lightbulb,
            'washing-machine': WashingMachine,
            heater: Flame,
            'air-vent': AirVent,
            plug: Plug,
        };
        return icons[iconName] || Plug;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'on':
                return 'text-green-400 bg-green-400/10 border-green-400/50';
            case 'off':
                return 'text-gray-400 bg-gray-400/10 border-gray-400/50';
            case 'idle':
                return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/50';
            case 'forced-off':
                return 'text-red-400 bg-red-400/10 border-red-400/50';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'on':
                return 'ON';
            case 'off':
                return 'OFF';
            case 'idle':
                return 'Idle Detected';
            case 'forced-off':
                return 'Forced OFF (Peak)';
        }
    };

    const toggleDevice = (deviceId: string) => {
        setDevices(devices.map(device => {
            if (device.id === deviceId && device.status !== 'forced-off') {
                return {
                    ...device,
                    status: device.status === 'on' ? 'off' : 'on'
                };
            }
            return device;
        }));
    };

    return (
        <div className="backdrop-blur-md bg-gray-900/50 rounded-2xl border border-gray-700/50 p-6 mb-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Connected Devices & Load Control</h2>
                <div className="flex items-center gap-2 text-yellow-400 mt-3">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm">Idle loads are automatically detected and controlled during peak hours.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {devices.map((device) => {
                    const Icon = getDeviceIcon(device.icon);
                    const canToggle = device.status !== 'forced-off';

                    return (
                        <div
                            key={device.id}
                            className="backdrop-blur-md bg-gray-800/50 rounded-xl border border-gray-700/50 p-5 hover:border-gray-600/50 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-lg bg-gray-700/50">
                                    <Icon className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(device.status)}`}>
                                    {getStatusText(device.status)}
                                </div>
                            </div>

                            <h3 className="text-white font-semibold mb-1">{device.name}</h3>
                            <p className="text-gray-400 text-sm mb-4">{device.power} W</p>

                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => toggleDevice(device.id)}
                                    disabled={!canToggle}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${device.status === 'on' ? 'bg-green-500' : 'bg-gray-600'
                                        } ${!canToggle ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${device.status === 'on' ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                                {device.autoControl && (
                                    <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">
                                        Auto
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="backdrop-blur-md bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                    <div className="text-gray-400 text-sm">Total Devices</div>
                    <div className="text-2xl font-bold text-white">{devices.length}</div>
                </div>
                <div className="backdrop-blur-md bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                    <div className="text-gray-400 text-sm">Active Devices</div>
                    <div className="text-2xl font-bold text-green-400">{devices.filter(d => d.status === 'on').length}</div>
                </div>
                <div className="backdrop-blur-md bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                    <div className="text-gray-400 text-sm">Total Power Draw</div>
                    <div className="text-2xl font-bold text-blue-400">
                        {devices.filter(d => d.status === 'on').reduce((sum, d) => sum + d.power, 0)} W
                    </div>
                </div>
            </div>
        </div>
    );
}
