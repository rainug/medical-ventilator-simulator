import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ECGDisplay from "./ECGDisplay";
import { ECGPattern, getECGPatternName } from "@/lib/ecgGenerator";
import { Activity, Heart, Droplet, Thermometer } from "lucide-react";

export interface VitalSigns {
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  spo2: number;
  temperature: number;
  respiratoryRate: number;
  ecgPattern: ECGPattern;
}

interface PatientMonitorProps {
  vitals: VitalSigns;
  onVitalsChange: (vitals: VitalSigns) => void;
  isRunning: boolean;
}

const ECG_PATTERNS: { value: ECGPattern; label: string; color: string }[] = [
  { value: "normal", label: "Normal Sinus", color: "bg-green-500" },
  { value: "tachycardia", label: "Tachycardia", color: "bg-yellow-500" },
  { value: "bradycardia", label: "Bradycardia", color: "bg-blue-500" },
  { value: "afib", label: "Atrial Fib", color: "bg-orange-500" },
  { value: "ves", label: "VES", color: "bg-purple-500" },
  { value: "st_elevation", label: "ST-Elevation", color: "bg-red-500" },
  { value: "st_depression", label: "ST-Depression", color: "bg-pink-500" },
  { value: "vfib", label: "V-Fib", color: "bg-red-700" },
  { value: "asystole", label: "Asystole", color: "bg-gray-700" },
];

export default function PatientMonitor({ vitals, onVitalsChange, isRunning }: PatientMonitorProps) {
  const setECGPattern = (pattern: ECGPattern) => {
    onVitalsChange({ ...vitals, ecgPattern: pattern });
  };

  const getVitalColor = (vital: string, value: number): string => {
    switch (vital) {
      case "hr":
        if (value < 60 || value > 100) return "text-yellow-500";
        return "text-green-500";
      case "bp":
        if (value > 140 || value < 90) return "text-yellow-500";
        return "text-green-500";
      case "spo2":
        if (value < 95) return "text-red-500";
        if (value < 98) return "text-yellow-500";
        return "text-green-500";
      case "temp":
        if (value < 35 || value > 37.5) return "text-yellow-500";
        return "text-cyan-500";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="space-y-4">
      {/* Vital Signs Display */}
      <div className="grid grid-cols-2 gap-4">
        {/* Heart Rate */}
        <Card className="bg-slate-900 border-green-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-green-400 flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Heart Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-4xl font-bold ${getVitalColor("hr", vitals.heartRate)}`}>
              {vitals.heartRate}
            </div>
            <div className="text-xs text-muted-foreground mt-1">bpm</div>
          </CardContent>
        </Card>

        {/* Blood Pressure */}
        <Card className="bg-slate-900 border-red-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-red-400 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Blood Pressure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-4xl font-bold ${getVitalColor("bp", vitals.bloodPressureSystolic)}`}>
              {vitals.bloodPressureSystolic}/{vitals.bloodPressureDiastolic}
            </div>
            <div className="text-xs text-muted-foreground mt-1">mmHg</div>
          </CardContent>
        </Card>

        {/* SpO2 */}
        <Card className="bg-slate-900 border-blue-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-blue-400 flex items-center gap-2">
              <Droplet className="h-4 w-4" />
              SpO₂
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-4xl font-bold ${getVitalColor("spo2", vitals.spo2)}`}>
              {vitals.spo2}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">Oxygen Saturation</div>
          </CardContent>
        </Card>

        {/* Temperature */}
        <Card className="bg-slate-900 border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-cyan-400 flex items-center gap-2">
              <Thermometer className="h-4 w-4" />
              Temperature
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-4xl font-bold ${getVitalColor("temp", vitals.temperature)}`}>
              {vitals.temperature.toFixed(1)}°C
            </div>
            <div className="text-xs text-muted-foreground mt-1">Body Temperature</div>
          </CardContent>
        </Card>
      </div>

      {/* Respiratory Rate */}
      <Card className="bg-slate-900 border-purple-500/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-purple-400">
            Respiratory Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-400">
            {vitals.respiratoryRate} <span className="text-lg">breaths/min</span>
          </div>
        </CardContent>
      </Card>

      {/* ECG Display */}
      <ECGDisplay 
        heartRate={vitals.heartRate} 
        pattern={vitals.ecgPattern} 
        isRunning={isRunning}
      />

      {/* ECG Pattern Control */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">
            ECG Pattern Simulator
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Current: {getECGPatternName(vitals.ecgPattern)}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {ECG_PATTERNS.map((pattern) => (
              <Button
                key={pattern.value}
                onClick={() => setECGPattern(pattern.value)}
                variant={vitals.ecgPattern === pattern.value ? "default" : "outline"}
                size="sm"
                className="relative"
                disabled={!isRunning}
              >
                <span className={`absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${pattern.color}`} />
                <span className="ml-3">{pattern.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Scenarios */}
      <Card className="border-2 border-primary/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">
            Quick Patient Scenarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => onVitalsChange({
                heartRate: 75,
                bloodPressureSystolic: 120,
                bloodPressureDiastolic: 80,
                spo2: 98,
                temperature: 36.6,
                respiratoryRate: 16,
                ecgPattern: "normal",
              })}
              variant="outline"
              size="sm"
              disabled={!isRunning}
            >
              Healthy Patient
            </Button>
            <Button
              onClick={() => onVitalsChange({
                heartRate: 45,
                bloodPressureSystolic: 90,
                bloodPressureDiastolic: 60,
                spo2: 92,
                temperature: 33.5,
                respiratoryRate: 10,
                ecgPattern: "bradycardia",
              })}
              variant="outline"
              size="sm"
              disabled={!isRunning}
            >
              Hypothermia
            </Button>
            <Button
              onClick={() => onVitalsChange({
                heartRate: 140,
                bloodPressureSystolic: 160,
                bloodPressureDiastolic: 100,
                spo2: 88,
                temperature: 37.8,
                respiratoryRate: 28,
                ecgPattern: "tachycardia",
              })}
              variant="outline"
              size="sm"
              disabled={!isRunning}
            >
              Critical State
            </Button>
            <Button
              onClick={() => onVitalsChange({
                heartRate: 110,
                bloodPressureSystolic: 140,
                bloodPressureDiastolic: 90,
                spo2: 94,
                temperature: 36.8,
                respiratoryRate: 20,
                ecgPattern: "st_elevation",
              })}
              variant="outline"
              size="sm"
              disabled={!isRunning}
            >
              STEMI (Heart Attack)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

