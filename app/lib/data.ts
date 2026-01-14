import { Device, LoadDataPoint, SystemStatus, HardwareComponent, HistoricalDataPoint } from './types';

export const mockLoadData: LoadDataPoint[] = [
    { time: '12 AM', hour: 0, originalLoad: 2.1, optimizedLoad: 2.1, zone: 'off-peak', source: 'grid', savings: 0 },
    { time: '1 AM', hour: 1, originalLoad: 1.8, optimizedLoad: 1.8, zone: 'off-peak', source: 'grid', savings: 0 },
    { time: '2 AM', hour: 2, originalLoad: 1.6, optimizedLoad: 1.6, zone: 'off-peak', source: 'grid', savings: 0 },
    { time: '3 AM', hour: 3, originalLoad: 1.5, optimizedLoad: 1.5, zone: 'off-peak', source: 'grid', savings: 0 },
    { time: '4 AM', hour: 4, originalLoad: 1.7, optimizedLoad: 1.7, zone: 'off-peak', source: 'grid', savings: 0 },
    { time: '5 AM', hour: 5, originalLoad: 2.3, optimizedLoad: 2.3, zone: 'off-peak', source: 'grid', savings: 0 },
    { time: '6 AM', hour: 6, originalLoad: 4.2, optimizedLoad: 4.2, zone: 'normal', source: 'grid', savings: 0 },
    { time: '7 AM', hour: 7, originalLoad: 6.8, optimizedLoad: 6.8, zone: 'normal', source: 'grid', savings: 0 },
    { time: '8 AM', hour: 8, originalLoad: 8.5, optimizedLoad: 8.5, zone: 'normal', source: 'grid', savings: 0 },
    { time: '9 AM', hour: 9, originalLoad: 9.2, optimizedLoad: 9.2, zone: 'normal', source: 'grid', savings: 0 },
    { time: '10 AM', hour: 10, originalLoad: 9.8, optimizedLoad: 9.8, zone: 'normal', source: 'grid', savings: 0 },
    { time: '11 AM', hour: 11, originalLoad: 10.5, optimizedLoad: 10.5, zone: 'normal', source: 'grid', savings: 0 },
    { time: '12 PM', hour: 12, originalLoad: 11.2, optimizedLoad: 11.2, zone: 'normal', source: 'grid', savings: 0 },
    { time: '1 PM', hour: 13, originalLoad: 11.8, optimizedLoad: 11.8, zone: 'normal', source: 'grid', savings: 0 },
    { time: '2 PM', hour: 14, originalLoad: 12.3, optimizedLoad: 12.3, zone: 'normal', source: 'grid', savings: 0 },
    { time: '3 PM', hour: 15, originalLoad: 13.5, optimizedLoad: 10.2, zone: 'peak', source: 'battery', savings: 24 },
    { time: '4 PM', hour: 16, originalLoad: 14.8, optimizedLoad: 11.5, zone: 'peak', source: 'battery', savings: 22 },
    { time: '5 PM', hour: 17, originalLoad: 15.2, optimizedLoad: 11.8, zone: 'peak', source: 'battery', savings: 22 },
    { time: '6 PM', hour: 18, originalLoad: 14.5, optimizedLoad: 11.2, zone: 'peak', source: 'battery', savings: 23 },
    { time: '7 PM', hour: 19, originalLoad: 13.8, optimizedLoad: 10.8, zone: 'peak', source: 'battery', savings: 22 },
    { time: '8 PM', hour: 20, originalLoad: 12.5, optimizedLoad: 10.1, zone: 'peak', source: 'battery', savings: 19 },
    { time: '9 PM', hour: 21, originalLoad: 10.2, optimizedLoad: 10.2, zone: 'normal', source: 'grid', savings: 0 },
    { time: '10 PM', hour: 22, originalLoad: 7.5, optimizedLoad: 7.5, zone: 'normal', source: 'grid', savings: 0 },
    { time: '11 PM', hour: 23, originalLoad: 4.8, optimizedLoad: 4.8, zone: 'normal', source: 'grid', savings: 0 },
];

export const mockDevices: Device[] = [
    { id: '1', name: 'Living Room TV', icon: 'tv', power: 120, status: 'on', autoControl: true, essential: false },
    { id: '2', name: 'Refrigerator', icon: 'refrigerator', power: 180, status: 'on', autoControl: false, essential: true },
    { id: '3', name: 'Ceiling Fan', icon: 'fan', power: 75, status: 'on', autoControl: true, essential: false },
    { id: '4', name: 'Kitchen Lights', icon: 'lightbulb', power: 60, status: 'on', autoControl: true, essential: true },
    { id: '5', name: 'Washing Machine', icon: 'washing-machine', power: 500, status: 'idle', autoControl: true, essential: false },
    { id: '6', name: 'Water Heater', icon: 'heater', power: 1500, status: 'forced-off', autoControl: true, essential: false },
    { id: '7', name: 'AC Unit', icon: 'air-vent', power: 1200, status: 'forced-off', autoControl: true, essential: false },
    { id: '8', name: 'Smart Plug 1', icon: 'plug', power: 45, status: 'off', autoControl: true, essential: false },
];

export const mockSystemStatus: SystemStatus = {
    loadLevel: 'medium',
    powerSource: 'battery',
    currentLoad: 11.8,
    peakLoad: 15.2,
    battery: {
        charge: 68,
        mode: 'discharging',
        estimatedRuntime: 145,
    },
    gridReduction: 22,
    costSavings: 348.50,
};

export const generateHistoricalData = (days: number): HistoricalDataPoint[] => {
    const data: HistoricalDataPoint[] = [];
    const now = new Date();

    for (let d = days; d >= 0; d--) {
        for (let h = 0; h < 24; h++) {
            const date = new Date(now);
            date.setDate(date.getDate() - d);
            date.setHours(h, 0, 0, 0);

            const isPeak = h >= 15 && h <= 20;
            const baseLoad = mockLoadData[h]?.originalLoad || 5;
            const variation = (Math.random() - 0.5) * 2;

            data.push({
                timestamp: date.toISOString(),
                load: Math.max(0, baseLoad + variation),
                batterySOC: isPeak ? 70 - (h - 15) * 8 : Math.min(100, 50 + (24 - h) * 2),
                isPeak,
            });
        }
    }

    return data;
};
