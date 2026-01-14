export type LoadLevel = 'low' | 'medium' | 'high';
export type PowerSource = 'grid' | 'battery' | 'load-shedding';
export type DeviceStatus = 'on' | 'off' | 'idle' | 'forced-off';
export type TimeZone = 'off-peak' | 'normal' | 'peak';

export interface LoadDataPoint {
    time: string;
    hour: number;
    originalLoad: number;
    optimizedLoad: number;
    zone: TimeZone;
    source: PowerSource;
    savings: number;
}

export interface Device {
    id: string;
    name: string;
    icon: string;
    power: number;
    status: DeviceStatus;
    autoControl: boolean;
    essential: boolean;
}

export interface BatteryStatus {
    charge: number;
    mode: 'charging' | 'discharging' | 'idle';
    estimatedRuntime: number;
}

export interface SystemStatus {
    loadLevel: LoadLevel;
    powerSource: PowerSource;
    currentLoad: number;
    peakLoad: number;
    battery: BatteryStatus;
    gridReduction: number;
    costSavings: number;
}

export interface HardwareComponent {
    component: string;
    purpose: string;
}

export interface HistoricalDataPoint {
    timestamp: string;
    load: number;
    batterySOC: number;
    isPeak: boolean;
}
