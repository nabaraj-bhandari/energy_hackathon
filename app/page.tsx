import Header from '@/app/components/Header';
import CurrentStatus from '@/app/components/CurrentStatus';
import LoadCurveGraph from '@/app/components/LoadCurveGraph';
import DeviceControlPanel from '@/app/components/DeviceControlPanel';
import HistoricalData from '@/app/components/HistoricalData';
import Footer from '@/app/components/Footer';
import { mockSystemStatus, mockLoadData, mockDevices } from '@/app/lib/data';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">

        <CurrentStatus status={mockSystemStatus} />


        <LoadCurveGraph data={mockLoadData} />

        <DeviceControlPanel devices={mockDevices} />


        <HistoricalData />



      </main>

      <Footer />
    </div>
  );
}
