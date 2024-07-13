<<<<<<< HEAD
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
=======
import defaultTheme from "tailwindcss/defaultTheme";
import colors from 'tailwindcss/colors';
import type { Config } from "tailwindcss";
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';
import typography from '@tailwindcss/typography'


const config: Config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	safelist: ["dark"],
	plugins: [addVariablesForColors, typography],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			lineHeight: {
				11: '2.75rem',
				12: '3rem',
				13: '3.25rem',
				14: '3.5rem'
			},
			fontFamily: {
				title: ['Saira', ...defaultTheme.fontFamily.sans],
				body: ['Open Sans', ...defaultTheme.fontFamily.sans],
				barlow: ['Barlow', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				primary: colors.green,
				secondary: colors.red,
				border: colors.amber,
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				gray: {
					50: "#E8E8E8",
					100: "#CFCFCF",
					200: "#A1A1A1",
					300: "#707070",
					400: "#404040",
					500: "#111111",
					600: "#0D0D0D",
					700: "#0A0A0A",
					800: "#080808",
					900: "#030303",
					950: "#030303"
				},
				pink: { //cb2d6f = pink dark
					50: "#FAEAF1",
					100: "#F6D5E3",
					200: "#ECA7C4",
					300: "#E27EA8",
					400: "#D9548B",
					500: "#CB2D6F",
					600: "#A32459",
					700: "#791B42",
					800: "#4F122B",
					900: "#2A0917",
					950: "#15050B"
				},
				teal: { //14a098 = teal dark
					50: "#E4FCFA",
					100: "#C4F8F5",
					200: "#89F0EB",
					300: "#4EE9E1",
					400: "#1BDAD0",
					500: "#14A098",
					600: "#107F79",
					700: "#0C5F5B",
					800: "#083F3D",
					900: "#04201E",
					950: "#021211"
				},
				stone: { //ccccc = gray white light
					50: "#FAFAFA",
					100: "#F5F5F5",
					200: "#EBEBEB",
					300: "#E0E0E0",
					400: "#D6D6D6",
					500: "#CCCCCC",
					600: "#A3A3A3",
					700: "#7A7A7A",
					800: "#525252",
					900: "#292929",
					950: "#141414"
				},
			},
			flexBasis: {
				'1/7': '14.2857143%',
				'2/7': '28.5714286%',
				'3/7': '42.8571429%',
				'4/7': '57.1428571%',
				'5/7': '71.4285714%',
				'6/7': '85.7142857%',
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme('colors.gray.700'),
						a: {
							color: theme('colors.primary.500'),
							'&:hover': {
								color: `${theme('colors.primary.600')} !important`
							},
							code: { color: theme('colors.primary.400') }
						},
						h1: {
							fontFamily: 'Saira',
							fontWeight: '800',
							color: theme('colors.green.900')
						},
						h2: {
							fontFamily: 'Saira',
							fontWeight: '800',
							color: theme('colors.gray.900')
						},
						h3: {
							fontFamily: 'Saira',
							fontWeight: '800',
							color: theme('colors.gray.900')
						},
						'h4,h5,h6': {
							color: theme('colors.gray.900')
						},
						pre: {
							backgroundColor: theme('colors.gray.800')
						},
						code: {
							color: theme('colors.pink.500'),
							backgroundColor: theme('colors.gray.100'),
							paddingLeft: '4px',
							paddingRight: '4px',
							paddingTop: '2px',
							paddingBottom: '2px',
							borderRadius: '0.25rem'
						},
						'code::before': {
							content: 'none'
						},
						'code::after': {
							content: 'none'
						},
						details: {
							backgroundColor: theme('colors.gray.100'),
							paddingLeft: '4px',
							paddingRight: '4px',
							paddingTop: '2px',
							paddingBottom: '2px',
							borderRadius: '0.25rem'
						},
						hr: { borderColor: theme('colors.gray.200') },
						'ol li::marker': {
							fontWeight: '600',
							color: theme('colors.gray.500')
						},
						'ul li::marker': {
							backgroundColor: theme('colors.gray.500')
						},
						strong: { color: theme('colors.gray.600') },
						blockquote: {
							color: theme('colors.gray.900'),
							borderLeftColor: theme('colors.gray.200')
						}
					}
				},
				dark: {
					css: {
						color: theme('colors.gray.300'),
						a: {
							color: theme('colors.primary.500'),
							'&:hover': {
								color: `${theme('colors.primary.400')} !important`
							},
							code: { color: theme('colors.primary.400') }
						},
						h1: {
							fontWeight: '700',
							letterSpacing: theme('letterSpacing.tight'),
							color: theme('colors.gray.100')
						},
						h2: {
							fontWeight: '700',
							letterSpacing: theme('letterSpacing.tight'),
							color: theme('colors.gray.100')
						},
						h3: {
							fontWeight: '600',
							color: theme('colors.gray.100')
						},
						'h4,h5,h6': {
							color: theme('colors.gray.100')
						},
						pre: {
							backgroundColor: theme('colors.gray.800')
						},
						code: {
							backgroundColor: theme('colors.gray.800')
						},
						details: {
							backgroundColor: theme('colors.gray.800')
						},
						hr: { borderColor: theme('colors.gray.700') },
						'ol li::marker': {
							fontWeight: '600',
							color: theme('colors.gray.400')
						},
						'ul li::marker': {
							backgroundColor: theme('colors.gray.400')
						},
						strong: { color: theme('colors.gray.100') },
						thead: {
							th: {
								color: theme('colors.gray.100')
							}
						},
						tbody: {
							tr: {
								borderBottomColor: theme('colors.gray.700')
							}
						},
						blockquote: {
							color: theme('colors.gray.100'),
							borderLeftColor: theme('colors.gray.700')
						}
					}
				}
			})

		}
	},
>>>>>>> b9cf5e9c5790866440fe280c85e44f2ec846c36e
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