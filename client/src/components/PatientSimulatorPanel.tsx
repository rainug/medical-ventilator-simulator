import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import PatientSilhouette from "./PatientSilhouette";
import { ECGPattern } from "@/lib/ecgGenerator";

interface PatientSimulatorPanelProps {
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  oxygenSaturation: number;
  temperature: number;
  respiratoryRate: number;
  ecgPattern: ECGPattern;
  onHeartRateChange: (value: number) => void;
  onBloodPressureChange: (systolic: number, diastolic: number) => void;
  onOxygenSaturationChange: (value: number) => void;
  onTemperatureChange: (value: number) => void;
  onRespiratoryRateChange: (value: number) => void;
  onECGPatternChange: (pattern: ECGPattern) => void;
}

export default function PatientSimulatorPanel({
  heartRate,
  bloodPressureSystolic,
  bloodPressureDiastolic,
  oxygenSaturation,
  temperature,
  respiratoryRate,
  ecgPattern,
  onHeartRateChange,
  onBloodPressureChange,
  onOxygenSaturationChange,
  onTemperatureChange,
  onRespiratoryRateChange,
  onECGPatternChange,
}: PatientSimulatorPanelProps) {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const ecgPatterns: { label: string; value: ECGPattern; color: string }[] = [
    { label: "Normal Sinus", value: "normal", color: "bg-green-500" },
    { label: "Tachycardie", value: "tachycardia", color: "bg-orange-500" },
    { label: "Bradycardie", value: "bradycardia", color: "bg-blue-500" },
    { label: "Vorhofflimmern", value: "afib", color: "bg-yellow-500" },
    { label: "VES", value: "ves", color: "bg-purple-500" },
    { label: "ST-Hebung", value: "st_elevation", color: "bg-red-500" },
    { label: "ST-Senkung", value: "st_depression", color: "bg-pink-500" },
    { label: "V-Fib", value: "vfib", color: "bg-red-700" },
    { label: "Asystolie", value: "asystole", color: "bg-gray-500" },
  ];

  const applyScenario = (scenario: string) => {
    setSelectedScenario(scenario);
    switch (scenario) {
      case "healthy":
        onHeartRateChange(75);
        onBloodPressureChange(120, 80);
        onOxygenSaturationChange(98);
        onTemperatureChange(36.6);
        onRespiratoryRateChange(16);
        onECGPatternChange("normal");
        break;
      case "hypothermia":
        onHeartRateChange(55);
        onBloodPressureChange(110, 70);
        onOxygenSaturationChange(95);
        onTemperatureChange(33.5);
        onRespiratoryRateChange(12);
        onECGPatternChange("bradycardia");
        break;
      case "critical":
        onHeartRateChange(135);
        onBloodPressureChange(85, 55);
        onOxygenSaturationChange(88);
        onTemperatureChange(38.9);
        onRespiratoryRateChange(28);
        onECGPatternChange("tachycardia");
        break;
      case "stemi":
        onHeartRateChange(95);
        onBloodPressureChange(140, 90);
        onOxygenSaturationChange(92);
        onTemperatureChange(37.2);
        onRespiratoryRateChange(22);
        onECGPatternChange("st_elevation");
        break;
    }
  };

  return (
    <div className="space-y-4">
      {/* Patient Silhouette */}
      <Card className="bg-slate-900/50 border-primary/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-primary">
            Patienten-Simulator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-4">
            <div className="w-48">
              <PatientSilhouette />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vital Parameters */}
      <Card className="bg-slate-900/50 border-primary/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-primary">
            Vitalparameter Einstellungen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Heart Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-300">Herzfrequenz</label>
              <span className="text-sm font-mono text-green-400">{heartRate} bpm</span>
            </div>
            <Slider
              value={[heartRate]}
              onValueChange={(v) => onHeartRateChange(v[0])}
              min={30}
              max={200}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>30 bpm</span>
              <span>200 bpm</span>
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-300">Blutdruck (Systolisch)</label>
              <span className="text-sm font-mono text-red-400">{bloodPressureSystolic} mmHg</span>
            </div>
            <Slider
              value={[bloodPressureSystolic]}
              onValueChange={(v) => onBloodPressureChange(v[0], bloodPressureDiastolic)}
              min={60}
              max={200}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-300">Blutdruck (Diastolisch)</label>
              <span className="text-sm font-mono text-red-400">{bloodPressureDiastolic} mmHg</span>
            </div>
            <Slider
              value={[bloodPressureDiastolic]}
              onValueChange={(v) => onBloodPressureChange(bloodPressureSystolic, v[0])}
              min={40}
              max={130}
              step={1}
            />
          </div>

          {/* Oxygen Saturation */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-300">Sauerstoffsättigung (SpO₂)</label>
              <span className="text-sm font-mono text-blue-400">{oxygenSaturation}%</span>
            </div>
            <Slider
              value={[oxygenSaturation]}
              onValueChange={(v) => onOxygenSaturationChange(v[0])}
              min={70}
              max={100}
              step={1}
            />
          </div>

          {/* Temperature */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-300">Körpertemperatur</label>
              <span className="text-sm font-mono text-cyan-400">{temperature.toFixed(1)}°C</span>
            </div>
            <Slider
              value={[temperature * 10]}
              onValueChange={(v) => onTemperatureChange(v[0] / 10)}
              min={300}
              max={420}
              step={1}
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>30.0°C</span>
              <span>42.0°C</span>
            </div>
          </div>

          {/* Respiratory Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm text-slate-300">Atemfrequenz</label>
              <span className="text-sm font-mono text-purple-400">{respiratoryRate} /min</span>
            </div>
            <Slider
              value={[respiratoryRate]}
              onValueChange={(v) => onRespiratoryRateChange(v[0])}
              min={6}
              max={40}
              step={1}
            />
          </div>
        </CardContent>
      </Card>

      {/* ECG Pattern Selector */}
      <Card className="bg-slate-900/50 border-primary/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-primary">
            EKG-Muster Simulator
          </CardTitle>
          <p className="text-xs text-slate-400 mt-1">
            Aktuell: {ecgPatterns.find(p => p.value === ecgPattern)?.label}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {ecgPatterns.map((pattern) => (
              <Button
                key={pattern.value}
                variant={ecgPattern === pattern.value ? "default" : "outline"}
                size="sm"
                onClick={() => onECGPatternChange(pattern.value)}
                className={`text-xs h-auto py-2 ${
                  ecgPattern === pattern.value ? pattern.color : ""
                }`}
              >
                {pattern.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Scenarios */}
      <Card className="bg-slate-900/50 border-primary/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-primary">
            Schnell-Szenarien
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={selectedScenario === "healthy" ? "default" : "outline"}
              size="sm"
              onClick={() => applyScenario("healthy")}
              className="text-xs"
            >
              Gesunder Patient
            </Button>
            <Button
              variant={selectedScenario === "hypothermia" ? "default" : "outline"}
              size="sm"
              onClick={() => applyScenario("hypothermia")}
              className="text-xs"
            >
              Hypothermie
            </Button>
            <Button
              variant={selectedScenario === "critical" ? "default" : "outline"}
              size="sm"
              onClick={() => applyScenario("critical")}
              className="text-xs"
            >
              Kritischer Zustand
            </Button>
            <Button
              variant={selectedScenario === "stemi" ? "default" : "outline"}
              size="sm"
              onClick={() => applyScenario("stemi")}
              className="text-xs"
            >
              STEMI (Herzinfarkt)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

