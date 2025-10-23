# Medical Ventilator & Patient Simulator

Interactive medical device simulator for the **Medical Cooling (Ethicalsaving)** therapeutic hypothermia system with integrated ventilation capabilities.

![Medical Ventilator Simulator](https://img.shields.io/badge/Status-Educational-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

This interactive web-based simulator provides a realistic interface for medical ventilator control and patient monitoring. It is designed for training, demonstration, and integration into the [Medicalcooling.com](https://medicalcooling.com) website.

### Key Features

#### 🫁 Ventilator Control Panel
- **Ventilation Modes**: CPAP, SIMV, Pressure Control, Volume Control, Assist Control
- **Adjustable Parameters**:
  - Respiratory Rate (8-40 bpm)
  - Tidal Volume (200-800 ml)
  - PEEP - Positive End-Expiratory Pressure (0-20 cmH₂O)
  - FiO₂ - Fraction of Inspired Oxygen (21-100%)
  - I:E Ratio - Inspiratory:Expiratory ratio
- **Real-time Monitoring**: Peak Pressure display
- **Power Control**: Start/Stop functionality with status indicators

#### 🏥 Patient Monitor & Simulator
- **Vital Signs Display**:
  - Heart Rate (bpm) with color-coded status
  - Blood Pressure (Systolic/Diastolic mmHg)
  - SpO₂ - Oxygen Saturation (%)
  - Body Temperature (°C)
  - Respiratory Rate (breaths/min)

#### 💓 ECG Display & Pattern Simulator
- **Real-time ECG Waveform**: Animated ECG display with medical-grade grid
- **9 ECG Patterns**:
  1. **Normal Sinus Rhythm** - Healthy baseline
  2. **Tachycardia** - Elevated heart rate
  3. **Bradycardia** - Reduced heart rate
  4. **Atrial Fibrillation** - Irregular rhythm
  5. **VES** - Ventricular Extrasystoles
  6. **ST-Elevation (STEMI)** - Heart attack indicator
  7. **ST-Depression** - Ischemia indicator
  8. **Ventricular Fibrillation** - Critical emergency
  9. **Asystole** - Cardiac arrest (flatline)

#### 🎯 Quick Patient Scenarios
Pre-configured clinical scenarios for rapid testing:
- **Healthy Patient** - Normal vital signs
- **Hypothermia** - Therapeutic cooling scenario (32-34°C target)
- **Critical State** - Emergency situation
- **STEMI (Heart Attack)** - Acute myocardial infarction

## Medical Context

This simulator is based on the **Medical Cooling** therapeutic hypothermia system, which focuses on:

- **Neuroprotection** through controlled cooling
- **Cardiac arrest treatment** - Early cooling in ambulances
- **Stroke patient care** - Target temperature 32-34°C
- **Survival improvement** - +167% survival rate with proper cooling

### Scientific Background

Cooling the brain below 36°C has been shown to increase survival rates by 167% in cardiac arrest patients. The Medical Cooling system integrates multiple critical care functions:

1. Ventilation (this simulator)
2. Vacuum Pump
3. ECG & Defibrillator
4. Telemedicine capabilities

## Technology Stack

- **Frontend Framework**: React 19
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Routing**: Wouter
- **Language**: TypeScript
- **Build Tool**: Vite

## Installation

### Prerequisites
- Node.js 22.x or higher
- pnpm (recommended) or npm

### Setup

```bash
# Clone the repository
git clone https://github.com/rainug/medical-ventilator-simulator.git
cd medical-ventilator-simulator

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Usage

### Running the Simulator

1. Click the **Start** button in the Ventilator Control Panel
2. Adjust ventilation parameters using sliders and dropdowns
3. Monitor patient vital signs in real-time
4. Select different ECG patterns to simulate various cardiac conditions
5. Use Quick Scenarios to instantly load pre-configured patient states

### Integration into Medicalcooling.com

The simulator is designed as a standalone React application that can be:

1. **Embedded as iframe**:
```html
<iframe src="https://your-deployment-url.com" width="100%" height="800px"></iframe>
```

2. **Integrated as React component**:
```tsx
import VentilatorSimulator from './path-to-simulator';

function YourPage() {
  return <VentilatorSimulator />;
}
```

3. **Deployed separately** and linked from the main website

## Project Structure

```
medical-ventilator-simulator/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── VentilatorControl.tsx    # Ventilator settings panel
│   │   │   ├── PatientMonitor.tsx       # Vital signs display
│   │   │   ├── ECGDisplay.tsx           # Real-time ECG waveform
│   │   │   └── ui/                      # shadcn/ui components
│   │   ├── lib/
│   │   │   └── ecgGenerator.ts          # ECG waveform algorithms
│   │   ├── pages/
│   │   │   └── Home.tsx                 # Main application page
│   │   └── App.tsx                      # Application root
│   └── public/                          # Static assets
└── README.md
```

## ECG Waveform Generation

The simulator uses mathematically generated ECG waveforms based on the PQRST complex:

- **P Wave**: Atrial depolarization
- **QRS Complex**: Ventricular depolarization
- **T Wave**: Ventricular repolarization
- **ST Segment**: Isoelectric period (modified in pathological conditions)

Each pattern is generated algorithmically to simulate realistic cardiac rhythms and pathologies.

## Design Philosophy

The interface follows medical device design principles:

- **Professional Medical Aesthetic**: Blue/white color scheme matching real ICU equipment
- **Clear Visual Hierarchy**: Critical information prominently displayed
- **Color-Coded Status**: Green (normal), Yellow (warning), Red (critical)
- **Responsive Layout**: Works on desktop, tablet, and large displays
- **Accessibility**: High contrast, readable fonts (Inter typeface)

## Educational Use

**Important**: This simulator is for **educational and demonstration purposes only**. All displayed values are simulated and should not be used for actual medical decision-making or patient care.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - See LICENSE file for details

## Credits

Developed for **Medical Cooling (Ethicalsaving)**
- CEO & Founder: Fabian Temme
- Patents: US11395900B2 & EP3509683A1

## References

- [Medical Cooling Website](https://medicalcooling.com)
- European & Global Medical Guidelines on Therapeutic Hypothermia
- Resuscitation Journal - Hypothermia for Neuroprotection Studies

## Contact

For questions or support regarding this simulator, please open an issue on GitHub.

---

**Disclaimer**: This is a simulation tool for educational purposes. It does not provide medical advice and should not be used in actual clinical settings.

