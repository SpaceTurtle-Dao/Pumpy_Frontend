<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs>
    <linearGradient id="cubeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#e0e0e0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#c8c8c8;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="edgeGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#b8b8b8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#a0a0a0;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="edgeGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#d0d0d0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#b8b8b8;stop-opacity:1" />
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" fill="#f0f0f0"/>

  <g transform="translate(100 100)">
    <animateTransform attributeName="transform" type="scale" additive="sum"
      values="1;1.05;1" dur="4s" repeatCount="indefinite" />
    <animateTransform attributeName="transform" type="rotate" additive="sum"
      values="0 0 0; 2 0 2; 0 2 0; -2 0 -2; 0 -2 0; 0 0 0" dur="6s" repeatCount="indefinite" />

    <!-- Front face -->
    <rect x="-40" y="-40" width="80" height="80" fill="url(#cubeGradient)">
      <animate attributeName="opacity" values="0.9;1;0.9" dur="4s" repeatCount="indefinite" />
    </rect>

    <!-- Right face -->
    <path d="M40,-40 l20,-20 v80 l-20,20 z" fill="url(#edgeGradient1)">
      <animate attributeName="opacity" values="0.7;0.8;0.7" dur="4s" repeatCount="indefinite" />
    </path>

    <!-- Top face -->
    <path d="M-40,-40 l80,0 l20,-20 l-80,0 z" fill="url(#edgeGradient2)">
      <animate attributeName="opacity" values="0.8;0.9;0.8" dur="4s" repeatCount="indefinite" />
    </path>
  </g>
</svg>