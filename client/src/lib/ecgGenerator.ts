export type ECGPattern = 
  | "normal"
  | "tachycardia"
  | "bradycardia"
  | "afib"
  | "ves"
  | "st_elevation"
  | "st_depression"
  | "vfib"
  | "asystole";

export interface ECGPoint {
  x: number;
  y: number;
}

/**
 * Generate ECG waveform data based on pattern type
 */
export function generateECGWaveform(
  pattern: ECGPattern,
  heartRate: number,
  duration: number = 10, // seconds
  sampleRate: number = 200 // Hz
): ECGPoint[] {
  const points: ECGPoint[] = [];
  const totalSamples = duration * sampleRate;
  
  switch (pattern) {
    case "normal":
      return generateNormalSinus(heartRate, totalSamples, sampleRate);
    case "tachycardia":
      return generateNormalSinus(Math.max(heartRate, 120), totalSamples, sampleRate);
    case "bradycardia":
      return generateNormalSinus(Math.min(heartRate, 50), totalSamples, sampleRate);
    case "afib":
      return generateAtrialFibrillation(heartRate, totalSamples, sampleRate);
    case "ves":
      return generateVES(heartRate, totalSamples, sampleRate);
    case "st_elevation":
      return generateSTElevation(heartRate, totalSamples, sampleRate);
    case "st_depression":
      return generateSTDepression(heartRate, totalSamples, sampleRate);
    case "vfib":
      return generateVentricularFibrillation(totalSamples, sampleRate);
    case "asystole":
      return generateAsystole(totalSamples, sampleRate);
    default:
      return generateNormalSinus(heartRate, totalSamples, sampleRate);
  }
}

function generateNormalSinus(
  heartRate: number,
  totalSamples: number,
  sampleRate: number
): ECGPoint[] {
  const points: ECGPoint[] = [];
  const beatInterval = (60 / heartRate) * sampleRate; // samples per beat
  
  for (let i = 0; i < totalSamples; i++) {
    const beatPhase = (i % beatInterval) / beatInterval;
    const y = calculateQRSComplex(beatPhase);
    points.push({ x: i / sampleRate, y });
  }
  
  return points;
}

function generateAtrialFibrillation(
  heartRate: number,
  totalSamples: number,
  sampleRate: number
): ECGPoint[] {
  const points: ECGPoint[] = [];
  const baseInterval = (60 / heartRate) * sampleRate;
  let nextBeat = 0;
  
  for (let i = 0; i < totalSamples; i++) {
    if (i >= nextBeat) {
      // Irregular R-R intervals
      const variation = 0.7 + Math.random() * 0.6; // 70% to 130% of base
      nextBeat = i + baseInterval * variation;
    }
    
    const beatPhase = (i % baseInterval) / baseInterval;
    const qrs = calculateQRSComplex(beatPhase);
    const fibrillation = (Math.random() - 0.5) * 0.1; // Irregular baseline
    points.push({ x: i / sampleRate, y: qrs + fibrillation });
  }
  
  return points;
}

function generateVES(
  heartRate: number,
  totalSamples: number,
  sampleRate: number
): ECGPoint[] {
  const points: ECGPoint[] = [];
  const beatInterval = (60 / heartRate) * sampleRate;
  const vesInterval = beatInterval * 5; // VES every 5 beats
  
  for (let i = 0; i < totalSamples; i++) {
    const beatPhase = (i % beatInterval) / beatInterval;
    const isVES = Math.floor(i / beatInterval) % 5 === 4;
    
    let y: number;
    if (isVES) {
      // Wide, bizarre QRS complex for VES
      y = calculateWideQRS(beatPhase);
    } else {
      y = calculateQRSComplex(beatPhase);
    }
    
    points.push({ x: i / sampleRate, y });
  }
  
  return points;
}

function generateSTElevation(
  heartRate: number,
  totalSamples: number,
  sampleRate: number
): ECGPoint[] {
  const points: ECGPoint[] = [];
  const beatInterval = (60 / heartRate) * sampleRate;
  
  for (let i = 0; i < totalSamples; i++) {
    const beatPhase = (i % beatInterval) / beatInterval;
    const y = calculateQRSComplex(beatPhase);
    
    // Elevate ST segment (after QRS, before T wave)
    const stElevation = (beatPhase > 0.3 && beatPhase < 0.6) ? 0.3 : 0;
    
    points.push({ x: i / sampleRate, y: y + stElevation });
  }
  
  return points;
}

function generateSTDepression(
  heartRate: number,
  totalSamples: number,
  sampleRate: number
): ECGPoint[] {
  const points: ECGPoint[] = [];
  const beatInterval = (60 / heartRate) * sampleRate;
  
  for (let i = 0; i < totalSamples; i++) {
    const beatPhase = (i % beatInterval) / beatInterval;
    const y = calculateQRSComplex(beatPhase);
    
    // Depress ST segment
    const stDepression = (beatPhase > 0.3 && beatPhase < 0.6) ? -0.2 : 0;
    
    points.push({ x: i / sampleRate, y: y + stDepression });
  }
  
  return points;
}

function generateVentricularFibrillation(
  totalSamples: number,
  sampleRate: number
): ECGPoint[] {
  const points: ECGPoint[] = [];
  
  for (let i = 0; i < totalSamples; i++) {
    // Chaotic, irregular waveform
    const y = Math.sin(i * 0.3) * 0.4 + 
              Math.sin(i * 0.7) * 0.3 + 
              (Math.random() - 0.5) * 0.5;
    points.push({ x: i / sampleRate, y });
  }
  
  return points;
}

function generateAsystole(
  totalSamples: number,
  sampleRate: number
): ECGPoint[] {
  const points: ECGPoint[] = [];
  
  for (let i = 0; i < totalSamples; i++) {
    // Flat line with minimal noise
    const y = (Math.random() - 0.5) * 0.02;
    points.push({ x: i / sampleRate, y });
  }
  
  return points;
}

/**
 * Calculate normal QRS complex waveform
 */
function calculateQRSComplex(phase: number): number {
  // P wave (0.0 - 0.15)
  if (phase < 0.15) {
    const p = phase / 0.15;
    return Math.sin(p * Math.PI) * 0.2;
  }
  
  // PR segment (0.15 - 0.2)
  if (phase < 0.2) {
    return 0;
  }
  
  // QRS complex (0.2 - 0.3)
  if (phase < 0.3) {
    const qrs = (phase - 0.2) / 0.1;
    // Q wave (small negative)
    if (qrs < 0.2) return -qrs * 0.5;
    // R wave (large positive)
    if (qrs < 0.6) return (qrs - 0.2) * 2.5;
    // S wave (negative)
    return 1.0 - (qrs - 0.6) * 3;
  }
  
  // ST segment (0.3 - 0.5)
  if (phase < 0.5) {
    return 0;
  }
  
  // T wave (0.5 - 0.8)
  if (phase < 0.8) {
    const t = (phase - 0.5) / 0.3;
    return Math.sin(t * Math.PI) * 0.3;
  }
  
  // TP segment (0.8 - 1.0)
  return 0;
}

/**
 * Calculate wide QRS complex (for VES)
 */
function calculateWideQRS(phase: number): number {
  // Wider, more bizarre QRS
  if (phase < 0.2) {
    return 0;
  }
  
  if (phase < 0.5) {
    const qrs = (phase - 0.2) / 0.3;
    if (qrs < 0.3) return -qrs * 0.8;
    if (qrs < 0.7) return (qrs - 0.3) * 2.0;
    return 0.8 - (qrs - 0.7) * 2.5;
  }
  
  return 0;
}

/**
 * Get display name for ECG pattern
 */
export function getECGPatternName(pattern: ECGPattern): string {
  const names: Record<ECGPattern, string> = {
    normal: "Normal Sinus Rhythm",
    tachycardia: "Tachycardia",
    bradycardia: "Bradycardia",
    afib: "Atrial Fibrillation",
    ves: "Ventricular Extrasystoles (VES)",
    st_elevation: "ST-Elevation (STEMI)",
    st_depression: "ST-Depression (Ischemia)",
    vfib: "Ventricular Fibrillation",
    asystole: "Asystole",
  };
  
  return names[pattern];
}

