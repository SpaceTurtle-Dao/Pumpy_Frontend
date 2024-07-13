import { stackedTheme } from './theme'
const { skeleton } = require('@skeletonlabs/tw-plugin');
/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'
const plugin = require('tailwindcss/plugin')

export default {
	content: ['./src/**/*.{html,js,svelte,ts}', require('path').join(require.resolve(
		'@skeletonlabs/skeleton'),
		'../**/*.{html,js,svelte,ts}'
	)],
	theme: {
		extend: {
			textShadow: {
				sm: '0 0px 5px var(--tw-shadow-color)',
				DEFAULT: '0 0px 10px var(--tw-shadow-color)',
				lg: '0 0px 15px var(--tw-shadow-color)',
			  },
		}
	},
	plugins: [
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
			  {
				'text-shadow': (value) => ({
				  textShadow: value,
				}),
			  },
			  { values: theme('textShadow') }
			)
		  }),
		forms,
		skeleton({
			themes: { custom: [stackedTheme] }
		}),
	]
};


// import { fontFamily } from "tailwindcss/defaultTheme";
// import type { Config } from "tailwindcss";

// const config: Config = {
// 	darkMode: ["class"],
// 	content: ["./src/**/*.{html,js,svelte,ts}"],
// 	safelist: ["dark"],
// 	theme: {
// 		container: {
// 			center: true,
// 			padding: "2rem",
// 			screens: {
// 				"2xl": "1400px"
// 			}
// 		},
// 		extend: {
// 			colors: {
// 				border: "hsl(var(--border) / <alpha-value>)",
// 				input: "hsl(var(--input) / <alpha-value>)",
// 				ring: "hsl(var(--ring) / <alpha-value>)",
// 				background: "hsl(var(--background) / <alpha-value>)",
// 				foreground: "hsl(var(--foreground) / <alpha-value>)",
// 				primary: {
// 					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
// 					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
// 				},
// 				secondary: {
// 					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
// 					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
// 				},
// 				destructive: {
// 					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
// 					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
// 				},
// 				muted: {
// 					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
// 					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
// 				},
// 				accent: {
// 					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
// 					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
// 				},
// 				popover: {
// 					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
// 					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
// 				},
// 				card: {
// 					DEFAULT: "hsl(var(--card) / <alpha-value>)",
// 					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
// 				}
// 			},
// 			borderRadius: {
// 				lg: "var(--radius)",
// 				md: "calc(var(--radius) - 2px)",
// 				sm: "calc(var(--radius) - 4px)"
// 			},
// 			fontFamily: {
// 				sans: [...fontFamily.sans]
// 			}
// 		}
// 	},
// };

// export default config;
