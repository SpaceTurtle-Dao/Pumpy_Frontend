import defaultTheme from "tailwindcss/defaultTheme";
// import { colors } from 'tailwindcss/colors';
import type { Config } from "tailwindcss";
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';
import typography from '@tailwindcss/typography'
import plugin from 'tailwindcss/plugin';

const pallet = {
  swappy_gray: {
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
  swappy_background: {
    50: "#F3F5F6",
    100: "#E8EBED",
    200: "#CBD1D7",
    300: "#ABB5BF",
    400: "#7C8C9C",
    500: "#444F5A",
    600: "#3D4751",
    700: "#374049",
    800: "#2A3037",
    900: "#21262C",
    950: "#161A1D"
  },
  swappy_navy: { //0F292F = navy
    50: "#F4F5F6",
    100: "#E6E7EA",
    200: "#CBCDD2",
    300: "#ADB1B8",
    400: "#7E8490",
    500: "#373A40",
    600: "#2D2F34",
    700: "#2D2F34",
    800: "#26282C",
    900: "#18191B",
    950: "#000000"
  },
  swappy_rose: { //501f3a = rose
    50: "#F0E5F0",
    100: "#E1CBE2",
    200: "#C193C2",
    300: "#A35FA5",
    400: "#6D3E6F",
    500: "#382039",
    600: "#2D1A2E",
    700: "#231424",
    800: "#170D17",
    900: "#0D070D",
    950: "#060407"
  },
  swappy_pink: { //cb2d6f = pink
    50: "#FEEBFC",
    100: "#FDD8F8",
    200: "#FBB1F2",
    300: "#FA8AEB",
    400: "#F85EE3",
    500: "#F638DC",
    600: "#E50AC8",
    700: "#B00899",
    800: "#750566",
    900: "#3B0333",
    950: "#1D011A"
  },
  swappy_stone: { //ccccc = stone
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
  swappy_teal: { //14a098 = teal
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
};

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: ["dark"],
  plugins: [
    addVariablesForColors,
    typography,
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: pallet.swappy_pink,
        secondary: pallet.swappy_rose,
        border: pallet.swappy_stone,
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: pallet.swappy_background,
        foreground: pallet.swappy_teal,
      },
      boxShadow: {
        md: '0px 2px 10px 0px rgba(0, 0, 0, 0.3), inset 0px -1px 5px 0px rgba(0, 0, 0, 0.3)',
      },
      textShadow: {
        sm: '0 0px 5px var(--tw-shadow-color)',
        DEFAULT: '0 0px 10px var(--tw-shadow-color)',
        lg: '0 0px 15px var(--tw-shadow-color)',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        title: ['Saira', ...defaultTheme.fontFamily.sans],
        body: ['Open Sans', ...defaultTheme.fontFamily.sans],
        barlow: ['Barlow', ...defaultTheme.fontFamily.sans],
        'nova-mono': ['Nova Mono', 'monospace'],
        'edu-au-vic-wa-nt-hand': ['Edu AU VIC WA NT Hand', 'cursive'],
      },
      flexBasis: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')} !important`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontFamily: 'Saira',
              fontWeight: '800',
              color: theme('colors.green.900'),
            },
            h2: {
              fontFamily: 'Saira',
              fontWeight: '800',
              color: theme('colors.gray.900'),
            },
            h3: {
              fontFamily: 'Saira',
              fontWeight: '800',
              color: theme('colors.gray.900'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.900'),
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              color: theme('colors.pink.500'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            details: {
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            hr: { borderColor: theme('colors.gray.200') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.500'),
            },
            strong: { color: theme('colors.gray.600') },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')} !important`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.100'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
            details: {
              backgroundColor: theme('colors.gray.800'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.gray.400'),
            },
            'ul li::marker': {
              backgroundColor: theme('colors.gray.400'),
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              th: {
                color: theme('colors.gray.100'),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            blockquote: {
              color: theme('colors.gray.100'),
              borderLeftColor: theme('colors.gray.700'),
            },
          },
        },
      }),
    },
  },
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme('colors'));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars,
  });
}

export default config;