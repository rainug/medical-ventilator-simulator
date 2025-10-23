import { useState } from "react";
import VentilatorControl, { VentilatorSettings } from "@/components/VentilatorControl";
import PatientMonitor, { VitalSigns } from "@/components/PatientMonitor";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  
  const [ventilatorSettings, setVentilatorSettings] = useState<VentilatorSettings>({
    mode: "SIMV",
    respiratoryRate: 16,
    tidalVolume: 500,
    peep: 5,
    fio2: 40,
    peakPressure: 20,
    ieRatio: "1:2",
  });

  const [patientVitals, setPatientVitals] = useState<VitalSigns>({
    heartRate: 75,
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 80,
    spo2: 98,
    temperature: 36.6,
    respiratoryRate: 16,
    ecgPattern: "normal",
  });

  const handleTogglePower = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="border-b border-primary/20 bg-slate-950/50 backdrop-blur-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={APP_LOGO} alt="Logo" className="h-10 w-10" />
              <div>
                <h1 className="text-2xl font-bold text-primary">{APP_TITLE}</h1>
                <p className="text-sm text-muted-foreground">
                  Interactive Medical Device Simulator
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Status</div>
                <div className={`text-sm font-semibold ${isRunning ? "text-green-500" : "text-gray-500"}`}>
                  {isRunning ? "● RUNNING" : "○ STANDBY"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Ventilator Control */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground mb-1">
                Ventilator Control Panel
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure ventilation parameters and monitor device status
              </p>
            </div>
            <VentilatorControl
              settings={ventilatorSettings}
              onSettingsChange={setVentilatorSettings}
              isRunning={isRunning}
              onTogglePower={handleTogglePower}
            />
          </div>

          {/* Right Column - Patient Monitor */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground mb-1">
                Patient Monitor & Simulator
              </h2>
              <p className="text-sm text-muted-foreground">
                Real-time vital signs monitoring and ECG display
              </p>
            </div>
            <PatientMonitor
              vitals={patientVitals}
              onVitalsChange={setPatientVitals}
              isRunning={isRunning}
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 p-6 bg-slate-900/50 rounded-lg border border-primary/20">
          <h3 className="text-sm font-semibold text-primary mb-2">
            About This Simulator
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This interactive ventilator interface simulates the Medical Cooling (Ethicalsaving) 
            therapeutic hypothermia system with integrated ventilation capabilities. The simulator 
            includes comprehensive patient monitoring with ECG display, vital signs tracking, and 
            various clinical scenarios for training and demonstration purposes. All displayed values 
            are simulated and for educational use only.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
              Therapeutic Hypothermia
            </span>
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
              Neuroprotection
            </span>
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
              Emergency Medicine
            </span>
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
              Cardiac Arrest Treatment
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

