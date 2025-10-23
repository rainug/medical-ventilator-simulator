import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateECGWaveform, ECGPattern, ECGPoint } from "@/lib/ecgGenerator";

interface ECGDisplayProps {
  heartRate: number;
  pattern: ECGPattern;
  isRunning: boolean;
}

export default function ECGDisplay({ heartRate, pattern, isRunning }: ECGDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const offsetRef = useRef<number>(0);
  const waveformRef = useRef<ECGPoint[]>([]);

  useEffect(() => {
    // Generate new waveform when pattern or heart rate changes
    waveformRef.current = generateECGWaveform(pattern, heartRate, 10, 200);
  }, [pattern, heartRate]);

  useEffect(() => {
    if (!isRunning) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.fillStyle = "#0a0e1a";
      ctx.fillRect(0, 0, width, height);

      // Draw grid
      drawGrid(ctx, width, height);

      // Draw ECG waveform
      if (waveformRef.current.length > 0) {
        drawWaveform(ctx, waveformRef.current, width, height, offsetRef.current);
      }

      // Update offset for scrolling effect
      offsetRef.current = (offsetRef.current + 0.02) % 10;

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning]);

  return (
    <Card className="bg-slate-950 border-primary/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-green-400">
          ECG - Lead II
        </CardTitle>
      </CardHeader>
      <CardContent>
        <canvas
          ref={canvasRef}
          width={800}
          height={200}
          className="w-full h-auto"
          style={{ imageRendering: "crisp-edges" }}
        />
      </CardContent>
    </Card>
  );
}

function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.strokeStyle = "#1e3a2e";
  ctx.lineWidth = 0.5;

  // Vertical lines (every 20px)
  for (let x = 0; x < width; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Horizontal lines (every 20px)
  for (let y = 0; y < height; y += 20) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Thicker lines every 100px
  ctx.strokeStyle = "#2a5a3e";
  ctx.lineWidth = 1;

  for (let x = 0; x < width; x += 100) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y < height; y += 100) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawWaveform(
  ctx: CanvasRenderingContext2D,
  waveform: ECGPoint[],
  width: number,
  height: number,
  offset: number
) {
  ctx.strokeStyle = "#00ff00";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const centerY = height / 2;
  const scale = height * 0.35;
  const timeScale = width / 5; // Show 5 seconds of data

  ctx.beginPath();
  let isFirst = true;

  for (const point of waveform) {
    const x = ((point.x - offset + 10) % 10) * timeScale;
    const y = centerY - point.y * scale;

    if (isFirst) {
      ctx.moveTo(x, y);
      isFirst = false;
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.stroke();
}

