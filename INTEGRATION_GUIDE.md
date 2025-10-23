# Integration Guide for Medicalcooling.com

This guide explains how to integrate the Medical Ventilator Simulator into the Medicalcooling.com website.

## Integration Options

### Option 1: Iframe Embedding (Easiest)

The simplest way to integrate the simulator is using an iframe. This requires no code changes to your existing website.

#### Step 1: Deploy the Simulator

Deploy the simulator to a hosting service:
- **Vercel** (recommended): Connect GitHub repo and deploy automatically
- **Netlify**: Similar to Vercel, easy GitHub integration
- **Your own server**: Build and host the static files

#### Step 2: Add Iframe to Your Website

```html
<!-- Full-page integration -->
<iframe 
  src="https://your-simulator-url.com" 
  width="100%" 
  height="900px"
  frameborder="0"
  style="border: none; border-radius: 8px;"
  title="Medical Ventilator Simulator"
></iframe>

<!-- Responsive integration -->
<div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;">
  <iframe 
    src="https://your-simulator-url.com" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    frameborder="0"
    title="Medical Ventilator Simulator"
  ></iframe>
</div>
```

### Option 2: Direct Integration (React)

If Medicalcooling.com is built with React, you can integrate the simulator directly.

#### Step 1: Install as Dependency

```bash
# Option A: Install from GitHub
npm install git+https://github.com/rainug/medical-ventilator-simulator.git

# Option B: Copy source files
# Copy the entire client/src folder into your project
```

#### Step 2: Import and Use Components

```tsx
import VentilatorControl from '@/components/VentilatorControl';
import PatientMonitor from '@/components/PatientMonitor';
import { useState } from 'react';

function SimulatorPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [ventilatorSettings, setVentilatorSettings] = useState({
    mode: "SIMV",
    respiratoryRate: 16,
    tidalVolume: 500,
    peep: 5,
    fio2: 40,
    peakPressure: 20,
    ieRatio: "1:2",
  });
  
  const [patientVitals, setPatientVitals] = useState({
    heartRate: 75,
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 80,
    spo2: 98,
    temperature: 36.6,
    respiratoryRate: 16,
    ecgPattern: "normal",
  });

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <VentilatorControl
        settings={ventilatorSettings}
        onSettingsChange={setVentilatorSettings}
        isRunning={isRunning}
        onTogglePower={() => setIsRunning(!isRunning)}
      />
      <PatientMonitor
        vitals={patientVitals}
        onVitalsChange={setPatientVitals}
        isRunning={isRunning}
      />
    </div>
  );
}
```

### Option 3: Standalone Page

Create a dedicated page on Medicalcooling.com for the simulator.

#### WordPress Integration

```php
<?php
/*
Template Name: Ventilator Simulator
*/
get_header();
?>

<div class="simulator-container" style="max-width: 1400px; margin: 0 auto; padding: 20px;">
  <iframe 
    src="https://your-simulator-url.com" 
    width="100%" 
    height="900px"
    frameborder="0"
    style="border: none; border-radius: 8px;"
    title="Medical Ventilator Simulator"
  ></iframe>
</div>

<?php get_footer(); ?>
```

#### HTML/Static Site

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Beatmungsgerät Simulator - Medical Cooling</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }
    .simulator-wrapper {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
    }
    iframe {
      border: none;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  </style>
</head>
<body>
  <div class="simulator-wrapper">
    <h1>Interaktiver Beatmungsgerät Simulator</h1>
    <p>Erleben Sie unser Medical Cooling System mit integrierter Beatmung</p>
    
    <iframe 
      src="https://your-simulator-url.com" 
      width="100%" 
      height="900px"
      title="Medical Ventilator Simulator"
    ></iframe>
  </div>
</body>
</html>
```

## Deployment Instructions

### Deploy to Vercel (Recommended)

1. **Create Vercel Account**: Sign up at [vercel.com](https://vercel.com)

2. **Import GitHub Repository**:
   - Click "New Project"
   - Import `rainug/medical-ventilator-simulator`
   - Vercel will auto-detect the configuration

3. **Configure Build Settings**:
   ```
   Framework Preset: Vite
   Build Command: pnpm build
   Output Directory: client/dist
   Install Command: pnpm install
   ```

4. **Deploy**: Click "Deploy" and wait for completion

5. **Get URL**: Copy the deployment URL (e.g., `https://medical-ventilator-simulator.vercel.app`)

### Deploy to Netlify

1. **Create Netlify Account**: Sign up at [netlify.com](https://netlify.com)

2. **New Site from Git**:
   - Connect GitHub account
   - Select `medical-ventilator-simulator` repository

3. **Build Settings**:
   ```
   Build command: pnpm build
   Publish directory: client/dist
   ```

4. **Deploy**: Netlify will build and deploy automatically

### Self-Hosted Deployment

```bash
# Build the application
cd medical-ventilator-simulator
pnpm install
pnpm build

# The built files will be in client/dist/
# Upload these files to your web server
# Point your web server to serve from this directory
```

## Customization

### Branding

Update the logo and title in `client/src/const.ts`:

```typescript
export const APP_TITLE = "Medical Cooling Beatmungsgerät";
export const APP_LOGO = "/path/to/your/logo.png";
```

### Colors

Modify the color scheme in `client/src/index.css`:

```css
:root {
  --primary: oklch(0.45 0.15 240); /* Medical blue */
  --background: oklch(0.98 0.005 240);
  /* Adjust other colors as needed */
}
```

### Language

The interface is currently in English. To translate to German:

1. Update all text strings in components
2. Or use i18n library like `react-i18next`

Example German translations:
- "Start" → "Starten"
- "Stop" → "Stoppen"
- "Ventilation Mode" → "Beatmungsmodus"
- "Heart Rate" → "Herzfrequenz"
- "Blood Pressure" → "Blutdruck"

## Responsive Design

The simulator is fully responsive and works on:
- **Desktop**: Full two-column layout
- **Tablet**: Stacked layout with optimized spacing
- **Mobile**: Single column, touch-friendly controls

Recommended minimum viewport width: 768px for optimal experience.

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Optimization

The ECG animation uses `requestAnimationFrame` for smooth 60fps rendering. For best performance:

- Use modern browsers with hardware acceleration
- Avoid running multiple instances simultaneously
- Consider pausing animation when not visible (tab switching)

## SEO Considerations

If embedding via iframe, add these meta tags to the parent page:

```html
<meta name="description" content="Interaktiver Medical Cooling Beatmungsgerät Simulator mit Patientenmonitor und EKG-Anzeige">
<meta name="keywords" content="Beatmungsgerät, Medical Cooling, Hypothermie, Simulator, Medizintechnik">
```

## Support

For technical support or questions:
- GitHub Issues: [https://github.com/rainug/medical-ventilator-simulator/issues](https://github.com/rainug/medical-ventilator-simulator/issues)
- Email: support@medicalcooling.com

## Updates

To update the simulator after integration:

1. **Iframe**: Simply redeploy the simulator (Vercel/Netlify auto-updates)
2. **Direct Integration**: Pull latest changes from GitHub and rebuild
3. **Standalone**: Replace files on your server with new build

## Example Integration on Medicalcooling.com

Suggested page structure:

```
/simulator
  ├── Header: "Erleben Sie unser Beatmungsgerät"
  ├── Introduction: Brief explanation of the system
  ├── Simulator: Embedded iframe or component
  └── Footer: Contact information, technical specs
```

## Testing Checklist

Before going live, test:
- [ ] Simulator loads correctly
- [ ] All controls are functional
- [ ] ECG animation runs smoothly
- [ ] Responsive design works on mobile
- [ ] Start/Stop button works
- [ ] All ECG patterns display correctly
- [ ] Quick scenarios load properly
- [ ] No console errors
- [ ] Page loads in under 3 seconds

## License

The simulator is MIT licensed and free to use for Medical Cooling / Medicalcooling.com.

