import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';


const config: Config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	safelist: ["dark"],
	plugins: [addVariablesForColors],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				},
				"Black": {
					50: "#E8E8E8",
					100: "#D1D1D1",
					200: "#A6A6A6",
					300: "#787878",
					400: "#4A4A4A",
					500: "#1E1E1E",
					600: "#171717",
					700: "#121212",
					800: "#0D0D0D",
					900: "#050505",
					950: "#030303"
				},
				"Green": {
					50: "#DEF7E2",
					100: "#BEEFC6",
					200: "#78DE89",
					300: "#37CE50",
					400: "#228B34",
					500: "#12491B",
					600: "#0E3915",
					700: "#0B2D11",
					800: "#071D0B",
					900: "#041006",
					950: "#020803"
				}

			},
			flexBasis: {
				'1/7': '14.2857143%',
				'2/7': '28.5714286%',
				'3/7': '42.8571429%',
				'4/7': '57.1428571%',
				'5/7': '71.4285714%',
				'6/7': '85.7142857%',
			},
			animation: {
				// ...other animations
				'meteor-effect': 'meteor 5s linear infinite'
			},
			keyframes: {
				// ... other keyframes
				meteor: {
					'0%': { transform: 'rotate(215deg) translateX(0)', opacity: "1" },
					'70%': { opacity: "1" },
					'100%': {
						transform: 'rotate(215deg) translateX(-500px)',
						opacity: "0"
					}
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			}
		}
	},
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
	const allColors = flattenColorPalette(theme('colors'));
	const newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		':root': newVars
	});
}

export default config;