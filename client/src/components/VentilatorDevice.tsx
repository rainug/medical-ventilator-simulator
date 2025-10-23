import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Power, AlertTriangle } from "lucide-react";
import ECGDisplay from "./ECGDisplay";
import { ECGPattern } from "@/lib/ecgGenerator";

interface VentilatorDeviceProps {
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  oxygenSaturation: number;
  temperature: number;
  respiratoryRate: number;
  ecgPattern: ECGPattern;
}

export default function VentilatorDevice({
  heartRate,
  bloodPressureSystolic,
  bloodPressureDiastolic,
  oxygenSaturation,
  temperature,
  respiratoryRate,
  ecgPattern,
}: VentilatorDeviceProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [ventilationMode, setVentilationMode] = useState("SIMV");
  const [respiratoryRateSet, setRespiratoryRateSet] = useState(16);
  const [tidalVolume, setTidalVolume] = useState(500);
  const [peep, setPeep] = useState(5);
  const [fio2, setFio2] = useState(40);
  const [ieRatio, setIeRatio] = useState("1:2");
  const [peakPressure, setPeakPressure] = useState(20);

  const getVitalColor = (param: string, value: number) => {
    switch (param) {
      case "hr":
        if (value < 60 || value > 100) return "text-red-400";
        return "text-green-400";
      case "spo2":
        if (value < 90) return "text-red-400";
        if (value < 95) return "text-yellow-400";
        return "text-green-400";
      case "temp":
        if (value < 35 || value > 38) return "text-red-400";
        if (value < 36 || value > 37.5) return "text-yellow-400";
        return "text-cyan-400";
      default:
        return "text-slate-300";
    }
  };

  return (
    <div className="space-y-4">
      {/* Device Header */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-primary tracking-wide">
                Medical Cooling Ventilator
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Therapeutic Hypothermia System
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-slate-400">Status</div>
                <div className={`text-sm font-semibold ${isRunning ? "text-green-400" : "text-slate-500"}`}>
                  {isRunning ? "● RUNNING" : "○ STANDBY"}
                </div>
              </div>
              <Button
                size="lg"
                onClick={() => setIsRunning(!isRunning)}
                className={`${
                  isRunning
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                } text-white font-semibold shadow-lg`}
              >
                <Power className="w-5 h-5 mr-2" />
                {isRunning ? "Stop" : "Start"}
              </Button>
            </div>
          </div>

          {/* Vital Signs Display - Device Style */}
          <div className="grid grid-cols-5 gap-3 mb-6">
            {/* Heart Rate */}
            <div className="bg-slate-950 border-2 border-green-900/50 rounded-lg p-3">
              <div className="text-xs text-green-500 font-semibold mb-1 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                HR
              </div>
              <div className={`text-3xl font-bold font-mono ${getVitalColor("hr", heartRate)}`}>
                {heartRate}
              </div>
              <div className="text-xs text-slate-500 mt-1">bpm</div>
            </div>

            {/* Blood Pressure */}
            <div className="bg-slate-950 border-2 border-red-900/50 rounded-lg p-3">
              <div className="text-xs text-red-400 font-semibold mb-1">BP</div>
              <div className="text-2xl font-bold font-mono text-red-400">
                {bloodPressureSystolic}
                <span className="text-lg">/{bloodPressureDiastolic}</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">mmHg</div>
            </div>

            {/* SpO2 */}
            <div className="bg-slate-950 border-2 border-blue-900/50 rounded-lg p-3">
              <div className="text-xs text-blue-400 font-semibold mb-1">SpO₂</div>
              <div className={`text-3xl font-bold font-mono ${getVitalColor("spo2", oxygenSaturation)}`}>
                {oxygenSaturation}
              </div>
              <div className="text-xs text-slate-500 mt-1">%</div>
            </div>

            {/* Temperature */}
            <div className="bg-slate-950 border-2 border-cyan-900/50 rounded-lg p-3">
              <div className="text-xs text-cyan-400 font-semibold mb-1">TEMP</div>
              <div className={`text-2xl font-bold font-mono ${getVitalColor("temp", temperature)}`}>
                {temperature.toFixed(1)}
              </div>
              <div className="text-xs text-slate-500 mt-1">°C</div>
            </div>

            {/* Respiratory Rate */}
            <div className="bg-slate-950 border-2 border-purple-900/50 rounded-lg p-3">
              <div className="text-xs text-purple-400 font-semibold mb-1">RR</div>
              <div className="text-3xl font-bold font-mono text-purple-400">
                {respiratoryRate}
              </div>
              <div className="text-xs text-slate-500 mt-1">/min</div>
            </div>
          </div>

          {/* ECG Display */}
          <div className="mb-6">
            <ECGDisplay heartRate={heartRate} pattern={ecgPattern} isRunning={isRunning} />
          </div>

          {/* Ventilator Controls */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column - Mode and Basic Settings */}
            <div className="space-y-4">
              <Card className="bg-slate-950 border-primary/30">
                <CardContent className="p-4">
                  <label className="text-xs font-semibold text-primary mb-2 block">
                    Beatmungsmodus
                  </label>
                  <Select value={ventilationMode} onValueChange={setVentilationMode}>
                    <SelectTrigger className="bg-slate-900 border-slate-700 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CPAP">CPAP - Continuous Positive Airway Pressure</SelectItem>
                      <SelectItem value="SIMV">SIMV - Synchronized Intermittent Mandatory Ventilation</SelectItem>
                      <SelectItem value="PC">PC - Pressure Control</SelectItem>
                      <SelectItem value="VC">VC - Volume Control</SelectItem>
                      <SelectItem value="AC">AC - Assist Control</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-xs text-slate-400 mt-2">
                    {ventilationMode === "SIMV" && "Synchronized Intermittent Mandatory Ventilation"}
                    {ventilationMode === "CPAP" && "Continuous Positive Airway Pressure"}
                    {ventilationMode === "PC" && "Pressure Control Ventilation"}
                    {ventilationMode === "VC" && "Volume Control Ventilation"}
                    {ventilationMode === "AC" && "Assist Control Ventilation"}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-950 border-primary/30">
                <CardContent className="p-4 space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-semibold text-slate-300">Atemfrequenz</label>
                      <span className="text-sm font-mono text-primary">{respiratoryRateSet} bpm</span>
                    </div>
                    <Slider
                      value={[respiratoryRateSet]}
                      onValueChange={(v) => setRespiratoryRateSet(v[0])}
                      min={8}
                      max={40}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>8 bpm</span>
                      <span>40 bpm</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-semibold text-slate-300">Tidalvolumen</label>
                      <span className="text-sm font-mono text-primary">{tidalVolume} ml</span>
                    </div>
                    <Slider
                      value={[tidalVolume]}
                      onValueChange={(v) => setTidalVolume(v[0])}
                      min={200}
                      max={800}
                      step={10}
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>200 ml</span>
                      <span>800 ml</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Advanced Settings */}
            <div className="space-y-4">
              <Card className="bg-slate-950 border-primary/30">
                <CardContent className="p-4 space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-semibold text-slate-300">
                        PEEP (Positive End-Expiratory Pressure)
                      </label>
                      <span className="text-sm font-mono text-primary">{peep} cmH₂O</span>
                    </div>
                    <Slider
                      value={[peep]}
                      onValueChange={(v) => setPeep(v[0])}
                      min={0}
                      max={20}
                      step={1}
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>0 cmH₂O</span>
                      <span>20 cmH₂O</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-semibold text-slate-300">
                        FiO₂ (Fraction of Inspired Oxygen)
                      </label>
                      <span className="text-sm font-mono text-primary">{fio2}%</span>
                    </div>
                    <Slider
                      value={[fio2]}
                      onValueChange={(v) => setFio2(v[0])}
                      min={21}
                      max={100}
                      step={1}
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>21% (Room Air)</span>
                      <span>100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-950 border-primary/30">
                <CardContent className="p-4">
                  <label className="text-xs font-semibold text-primary mb-2 block">
                    I:E Ratio (Inspiratory:Expiratory)
                  </label>
                  <Select value={ieRatio} onValueChange={setIeRatio}>
                    <SelectTrigger className="bg-slate-900 border-slate-700 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1:1">1:1 (Equal)</SelectItem>
                      <SelectItem value="1:2">1:2 (Normal)</SelectItem>
                      <SelectItem value="1:3">1:3</SelectItem>
                      <SelectItem value="2:1">2:1 (Inverse)</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Peak Pressure Monitor */}
          <Card className="bg-slate-950 border-primary/30 mt-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Peak Pressure (Monitored)</div>
                  <div className="text-4xl font-bold font-mono text-blue-400">
                    {peakPressure} <span className="text-xl text-slate-500">cmH₂O</span>
                  </div>
                </div>
                {peakPressure > 30 && (
                  <div className="flex items-center gap-2 bg-red-900/30 border border-red-500 rounded-lg px-4 py-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-semibold text-red-400">High Pressure Alert</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Device Info Footer */}
          <div className="mt-6 pt-4 border-t border-slate-700">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex gap-4">
                <span className="text-primary font-semibold">Therapeutic Hypothermia</span>
                <span>•</span>
                <span>Neuroprotection</span>
                <span>•</span>
                <span>Emergency Medicine</span>
                <span>•</span>
                <span>Cardiac Arrest Treatment</span>
              </div>
              <div className="text-slate-500">
                Simulator v1.0 | Educational Use Only
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

