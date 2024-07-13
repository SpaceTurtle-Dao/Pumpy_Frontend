<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
	<defs>
		<linearGradient id="frontGradient" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" style="stop-color:#ffffff">
				<animate
					attributeName="stop-color"
					values="#ffffff;#e0e0e0;#ffffff"
					dur="8s"
					repeatCount="indefinite"
				/>
			</stop>
			<stop offset="100%" style="stop-color:#d0d0d0">
				<animate
					attributeName="stop-color"
					values="#d0d0d0;#f0f0f0;#d0d0d0"
					dur="8s"
					repeatCount="indefinite"
				/>
			</stop>
		</linearGradient>
		<linearGradient id="rightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" style="stop-color:#e0e0e0">
				<animate
					attributeName="stop-color"
					values="#e0e0e0;#c0c0c0;#e0e0e0"
					dur="8s"
					repeatCount="indefinite"
				/>
			</stop>
			<stop offset="100%" style="stop-color:#b0b0b0">
				<animate
					attributeName="stop-color"
					values="#b0b0b0;#d0d0d0;#b0b0b0"
					dur="8s"
					repeatCount="indefinite"
				/>
			</stop>
		</linearGradient>
		<linearGradient id="topGradient" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" style="stop-color:#f0f0f0">
				<animate
					attributeName="stop-color"
					values="#f0f0f0;#d0d0d0;#f0f0f0"
					dur="8s"
					repeatCount="indefinite"
				/>
			</stop>
			<stop offset="100%" style="stop-color:#c0c0c0">
				<animate
					attributeName="stop-color"
					values="#c0c0c0;#e0e0e0;#c0c0c0"
					dur="8s"
					repeatCount="indefinite"
				/>
			</stop>
		</linearGradient>
	</defs>

	<g transform="translate(100 100)">
		<animateTransform
			attributeName="transform"
			type="scale"
			additive="sum"
			values="1;1.05;1"
			dur="4s"
			repeatCount="indefinite"
		/>
		<animateTransform
			attributeName="transform"
			type="rotate"
			additive="sum"
			values="0 0 0; 2 0 2; 0 2 0; -2 0 -2; 0 -2 0; 0 0 0"
			dur="6s"
			repeatCount="indefinite"
		/>

		<!-- Front face -->
		<rect x="-60" y="-60" width="120" height="120" fill="url(#frontGradient)">
			<animate attributeName="opacity" values="0.9;1;0.9" dur="4s" repeatCount="indefinite" />
		</rect>

		<!-- Right face -->
		<path d="M60,-60 l30,-30 v120 l-30,30 z" fill="url(#rightGradient)">
			<animate attributeName="opacity" values="0.7;0.8;0.7" dur="4s" repeatCount="indefinite" />
		</path>

		<!-- Top face -->
		<path d="M-60,-60 l120,0 l30,-30 l-120,0 z" fill="url(#topGradient)">
			<animate attributeName="opacity" values="0.8;0.9;0.8" dur="4s" repeatCount="indefinite" />
		</path>
	</g>
</svg>
