export default function PatientSilhouette() {
  return (
    <svg
      viewBox="0 0 200 400"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <ellipse cx="100" cy="40" rx="25" ry="30" fill="#1e3a8a" opacity="0.3" stroke="#3b82f6" strokeWidth="2"/>
      
      {/* Neck */}
      <rect x="90" y="65" width="20" height="15" fill="#1e3a8a" opacity="0.3" stroke="#3b82f6" strokeWidth="2"/>
      
      {/* Torso */}
      <ellipse cx="100" cy="140" rx="45" ry="70" fill="#1e3a8a" opacity="0.3" stroke="#3b82f6" strokeWidth="2"/>
      
      {/* Heart indicator */}
      <g transform="translate(85, 120)">
        <path
          d="M15,8 C15,5 12,3 9,3 C7,3 5,4 4,6 C3,4 1,3 -1,3 C-4,3 -7,5 -7,8 C-7,12 -3,16 4,22 C11,16 15,12 15,8 Z"
          fill="#ef4444"
          opacity="0.6"
        >
          <animate
            attributeName="opacity"
            values="0.4;0.8;0.4"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
      
      {/* Lungs indicator */}
      <g transform="translate(100, 130)">
        {/* Left lung */}
        <ellipse cx="-15" cy="0" rx="12" ry="20" fill="#60a5fa" opacity="0.4" stroke="#3b82f6" strokeWidth="1.5">
          <animate
            attributeName="ry"
            values="20;22;20"
            dur="3s"
            repeatCount="indefinite"
          />
        </ellipse>
        {/* Right lung */}
        <ellipse cx="15" cy="0" rx="12" ry="20" fill="#60a5fa" opacity="0.4" stroke="#3b82f6" strokeWidth="1.5">
          <animate
            attributeName="ry"
            values="20;22;20"
            dur="3s"
            repeatCount="indefinite"
          />
        </ellipse>
      </g>
      
      {/* Arms */}
      <rect x="35" y="90" width="15" height="80" rx="7" fill="#1e3a8a" opacity="0.3" stroke="#3b82f6" strokeWidth="2"/>
      <rect x="150" y="90" width="15" height="80" rx="7" fill="#1e3a8a" opacity="0.3" stroke="#3b82f6" strokeWidth="2"/>
      
      {/* Blood pressure cuff on left arm */}
      <rect x="32" y="110" width="21" height="25" fill="#475569" opacity="0.6" stroke="#94a3b8" strokeWidth="2" rx="2"/>
      <text x="42.5" y="125" fontSize="8" fill="#e2e8f0" textAnchor="middle" fontFamily="monospace">BP</text>
      
      {/* Pulse oximeter on right hand */}
      <rect x="147" y="165" width="21" height="15" fill="#dc2626" opacity="0.6" stroke="#f87171" strokeWidth="2" rx="2"/>
      <text x="157.5" y="175" fontSize="8" fill="#fee2e2" textAnchor="middle" fontFamily="monospace">SpO₂</text>
      
      {/* Legs */}
      <rect x="70" y="200" width="20" height="120" rx="10" fill="#1e3a8a" opacity="0.3" stroke="#3b82f6" strokeWidth="2"/>
      <rect x="110" y="200" width="20" height="120" rx="10" fill="#1e3a8a" opacity="0.3" stroke="#3b82f6" strokeWidth="2"/>
      
      {/* Temperature sensor indicator */}
      <circle cx="100" cy="50" r="5" fill="#f59e0b" opacity="0.7" stroke="#fbbf24" strokeWidth="1.5"/>
      <text x="110" y="53" fontSize="8" fill="#fbbf24" fontFamily="monospace">TEMP</text>
      
      {/* ECG electrodes */}
      <circle cx="85" cy="115" r="4" fill="#22c55e" opacity="0.7" stroke="#4ade80" strokeWidth="1.5"/>
      <circle cx="115" cy="115" r="4" fill="#22c55e" opacity="0.7" stroke="#4ade80" strokeWidth="1.5"/>
      <circle cx="100" cy="155" r="4" fill="#22c55e" opacity="0.7" stroke="#4ade80" strokeWidth="1.5"/>
    </svg>
  );
}

