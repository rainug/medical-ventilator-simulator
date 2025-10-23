import { useState } from "react";
import { APP_TITLE } from "@/const";
import PatientSimulatorPanel from "@/components/PatientSimulatorPanel";
import VentilatorDevice from "@/components/VentilatorDevice";
import { ECGPattern } from "@/lib/ecgGenerator";

export default function Home() {
  // Patient vital signs state
  const [heartRate, setHeartRate] = useState(75);
  const [bloodPressureSystolic, setBloodPressureSystolic] = useState(120);
  const [bloodPressureDiastolic, setBloodPressureDiastolic] = useState(80);
  const [oxygenSaturation, setOxygenSaturation] = useState(98);
  const [temperature, setTemperature] = useState(36.6);
  const [respiratoryRate, setRespiratoryRate] = useState(16);
  const [ecgPattern, setEcgPattern] = useState<ECGPattern>("normal");

  const handleBloodPressureChange = (systolic: number, diastolic: number) => {
    setBloodPressureSystolic(systolic);
    setBloodPressureDiastolic(diastolic);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">MC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{APP_TITLE}</h1>
                <p className="text-xs text-slate-400">Interactive Medical Device Simulator</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Patient Simulator */}
          <div className="lg:col-span-1">
            <PatientSimulatorPanel
              heartRate={heartRate}
              bloodPressureSystolic={bloodPressureSystolic}
              bloodPressureDiastolic={bloodPressureDiastolic}
              oxygenSaturation={oxygenSaturation}
              temperature={temperature}
              respiratoryRate={respiratoryRate}
              ecgPattern={ecgPattern}
              onHeartRateChange={setHeartRate}
              onBloodPressureChange={handleBloodPressureChange}
              onOxygenSaturationChange={setOxygenSaturation}
              onTemperatureChange={setTemperature}
              onRespiratoryRateChange={setRespiratoryRate}
              onECGPatternChange={setEcgPattern}
            />
          </div>

          {/* Right Panel - Ventilator Device */}
          <div className="lg:col-span-2">
            <VentilatorDevice
              heartRate={heartRate}
              bloodPressureSystolic={bloodPressureSystolic}
              bloodPressureDiastolic={bloodPressureDiastolic}
              oxygenSaturation={oxygenSaturation}
              temperature={temperature}
              respiratoryRate={respiratoryRate}
              ecgPattern={ecgPattern}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

