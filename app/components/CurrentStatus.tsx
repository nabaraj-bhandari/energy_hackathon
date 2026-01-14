import { AlertTriangle, Battery, BatteryCharging, TrendingDown, DollarSign, Zap, IndianRupee, IndianRupeeIcon } from 'lucide-react';
import { SystemStatus } from '@/app/lib/types';

interface CurrentStatusProps {
    status: SystemStatus;
}

export default function CurrentStatus({ status }: CurrentStatusProps) {
    const getLoadLevelColor = () => {
        switch (status.loadLevel) {
            case 'low':
                return 'from-green-500 to-green-600';
            case 'medium':
                return 'from-yellow-500 to-yellow-600';
            case 'high':
                return 'from-red-500 to-red-600';
        }
    };

    const getLoadLevelWidth = () => {
        switch (status.loadLevel) {
            case 'low':
                return 'w-1/3';
            case 'medium':
                return 'w-2/3';
            case 'high':
                return 'w-full';
        }
    };

    const getPowerSourceInfo = () => {
        switch (status.powerSource) {
            case 'grid':
                return { icon: Zap, text: 'Running on Grid Power', color: 'text-blue-400' };
            case 'battery':
                return { icon: Battery, text: 'Running on Battery (Peak Optimization Active)', color: 'text-green-400' };
            case 'load-shedding':
                return { icon: AlertTriangle, text: 'Load Shedding Active', color: 'text-red-400' };
        }
    };

    const { battery, gridReduction, costSavings } = status;

    const getBatteryColor = () => {
        if (battery.charge > 60) return 'text-green-400';
        if (battery.charge > 30) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getModeIcon = () => {
        if (battery.mode === 'charging') return BatteryCharging;
        return Battery;
    };


    const powerSourceInfo = getPowerSourceInfo();
    const PowerSourceIcon = powerSourceInfo.icon;

    const ModeIcon = getModeIcon();



    return (
        <div className="backdrop-blur-md bg-gray-900/50 rounded-2xl border border-gray-700/50 p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Current Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <h3 className="text-gray-400 text-sm font-medium mb-3">Load Level Indicator</h3>
                    <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getLoadLevelColor()} ${getLoadLevelWidth()} transition-all duration-500 rounded-full`}
                        >
                        </div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs">
                        <span className="text-green-400">Low</span>
                        <span className="text-yellow-400">Medium</span>
                        <span className="text-red-400">High</span>
                    </div>
                    <div className="mt-3 text-sm text-gray-300">
                        Current Load: <span className="font-bold text-white">{status.currentLoad} kW</span>
                    </div>
                </div>

                <div className="flex items-center justify-center md:justify-end">
                    <div className="flex items-center gap-3">
                        <PowerSourceIcon className={`${powerSourceInfo.color} w-8 h-8`} />
                        <div>
                            <div className="text-xs text-gray-400">Power Source</div>
                            <div className={`${powerSourceInfo.color} font-semibold`}>
                                {powerSourceInfo.text}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="backdrop-blur-md bg-gray-800/50 rounded-xl border border-gray-700/50 p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gray-700/50">
                            <ModeIcon className={`w-6 h-6 ${getBatteryColor()}`} />
                        </div>
                        <div className="text-gray-400 text-sm">Battery Charge</div>
                    </div>
                    <div className={`text-3xl font-bold ${getBatteryColor()}`}>{battery.charge}%</div>
                    <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-500 ${battery.charge > 60 ? 'bg-green-500' : battery.charge > 30 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                            style={{ width: `${battery.charge}%` }}
                        ></div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                        Runtime: {battery.estimatedRuntime} min
                    </div>
                </div>

                <div className="backdrop-blur-md bg-gray-800/50 rounded-xl border border-gray-700/50 p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gray-700/50">
                            <IndianRupeeIcon className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div className="text-gray-400 text-sm">Estimated Savings</div>
                    </div>
                    <div className="text-3xl font-bold text-yellow-400">रु. {costSavings.toFixed(2)}</div>
                    <div className="text-sm text-gray-400 mt-1">This month</div>
                    <div className="mt-3 text-xs text-green-400">
                        ↑ 18% vs last month
                    </div>
                </div>
            </div>
        </div>
    );
}
