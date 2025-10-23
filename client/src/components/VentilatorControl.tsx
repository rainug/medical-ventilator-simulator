import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Power, AlertTriangle } from "lucide-react";

export interface VentilatorSettings {
  mode: string;
  respiratoryRate: number;
  tidalVolume: number;
  peep: number;
  fio2: number;
  peakPressure: number;
  ieRatio: string;
}

interface VentilatorControlProps {
  settings: VentilatorSettings;
  onSettingsChange: (settings: VentilatorSettings) => void;
  isRunning: boolean;
  onTogglePower: () => void;
}

export default function VentilatorControl({
  settings,
  onSettingsChange,
  isRunning,
  onTogglePower,
}: VentilatorControlProps) {
  const [alarms, setAlarms] = useState<string[]>([]);

  const updateSetting = (key: keyof VentilatorSettings, value: number | string) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-4">
      {/* Header with Power Control */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-primary">
              Medical Cooling Ventilator
            </CardTitle>
            <Button
              onClick={onTogglePower}
              variant={isRunning ? "destructive" : "default"}
              size="lg"
              className="gap-2"
            >
              <Power className="h-5 w-5" />
              {isRunning ? "Stop" : "Start"}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Alarms */}
      {alarms.length > 0 && (
        <Card className="border-2 border-destructive bg-destructive/5">
          <CardContent className="pt-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-destructive mb-1">Active Alarms</h4>
                <div className="space-y-1">
                  {alarms.map((alarm, idx) => (
                    <p key={idx} className="text-sm text-destructive/90">{alarm}</p>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ventilation Mode */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Ventilation Mode
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={settings.mode}
            onValueChange={(value) => updateSetting("mode", value)}
            disabled={!isRunning}
          >
            <SelectTrigger className="w-full">
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
        </CardContent>
      </Card>

      {/* Respiratory Rate */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Respiratory Rate
            </CardTitle>
            <Badge variant="secondary" className="text-lg font-semibold">
              {settings.respiratoryRate} bpm
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Slider
            value={[settings.respiratoryRate]}
            onValueChange={([value]) => updateSetting("respiratoryRate", value)}
            min={8}
            max={40}
            step={1}
            disabled={!isRunning}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>8 bpm</span>
            <span>40 bpm</span>
          </div>
        </CardContent>
      </Card>

      {/* Tidal Volume */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tidal Volume
            </CardTitle>
            <Badge variant="secondary" className="text-lg font-semibold">
              {settings.tidalVolume} ml
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Slider
            value={[settings.tidalVolume]}
            onValueChange={([value]) => updateSetting("tidalVolume", value)}
            min={200}
            max={800}
            step={10}
            disabled={!isRunning}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>200 ml</span>
            <span>800 ml</span>
          </div>
        </CardContent>
      </Card>

      {/* PEEP */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              PEEP (Positive End-Expiratory Pressure)
            </CardTitle>
            <Badge variant="secondary" className="text-lg font-semibold">
              {settings.peep} cmH₂O
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Slider
            value={[settings.peep]}
            onValueChange={([value]) => updateSetting("peep", value)}
            min={0}
            max={20}
            step={1}
            disabled={!isRunning}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>0 cmH₂O</span>
            <span>20 cmH₂O</span>
          </div>
        </CardContent>
      </Card>

      {/* FiO2 */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              FiO₂ (Fraction of Inspired Oxygen)
            </CardTitle>
            <Badge variant="secondary" className="text-lg font-semibold">
              {settings.fio2}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Slider
            value={[settings.fio2]}
            onValueChange={([value]) => updateSetting("fio2", value)}
            min={21}
            max={100}
            step={1}
            disabled={!isRunning}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>21% (Room Air)</span>
            <span>100%</span>
          </div>
        </CardContent>
      </Card>

      {/* I:E Ratio */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            I:E Ratio (Inspiratory:Expiratory)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={settings.ieRatio}
            onValueChange={(value) => updateSetting("ieRatio", value)}
            disabled={!isRunning}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1:1">1:1</SelectItem>
              <SelectItem value="1:1.5">1:1.5</SelectItem>
              <SelectItem value="1:2">1:2 (Normal)</SelectItem>
              <SelectItem value="1:3">1:3</SelectItem>
              <SelectItem value="1:4">1:4</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Peak Pressure Display */}
      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Peak Pressure (Monitored)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-primary text-center">
            {settings.peakPressure} <span className="text-xl">cmH₂O</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

