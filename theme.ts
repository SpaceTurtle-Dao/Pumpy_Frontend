// import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';


export const stackedTheme: CustomThemeConfig = {
	name: 'stackedTheme',
	properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "var(--color-surface-600)",
		"--theme-font-color-dark": "var(--color-tertiary-300)",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "0 0 0",
		"--on-success": "var(--color-surface-700)",
		"--on-warning": "0 0 0",
		"--on-error": "var(--color-primary-400)",
		"--on-surface": "var(--color-primary-400)",
		// =~= Theme Colors  =~=
		// primary | #D1D1D1 
		"--color-primary-50": "248 248 248", // #f8f8f8
		"--color-primary-100": "246 246 246", // #f6f6f6
		"--color-primary-200": "244 244 244", // #f4f4f4
		"--color-primary-300": "237 237 237", // #ededed
		"--color-primary-400": "223 223 223", // #dfdfdf
		"--color-primary-500": "209 209 209", // #D1D1D1
		"--color-primary-600": "188 188 188", // #bcbcbc
		"--color-primary-700": "157 157 157", // #9d9d9d
		"--color-primary-800": "125 125 125", // #7d7d7d
		"--color-primary-900": "102 102 102", // #666666
		// secondary | #525252 
		"--color-secondary-50": "229 229 229", // #e5e5e5
		"--color-secondary-100": "220 220 220", // #dcdcdc
		"--color-secondary-200": "212 212 212", // #d4d4d4
		"--color-secondary-300": "186 186 186", // #bababa
		"--color-secondary-400": "134 134 134", // #868686
		"--color-secondary-500": "82 82 82", // #525252
		"--color-secondary-600": "74 74 74", // #4a4a4a
		"--color-secondary-700": "62 62 62", // #3e3e3e
		"--color-secondary-800": "49 49 49", // #313131
		"--color-secondary-900": "40 40 40", // #282828
		// tertiary | #A9E3AF 
		"--color-tertiary-50": "242 251 243", // #f2fbf3
		"--color-tertiary-100": "238 249 239", // #eef9ef
		"--color-tertiary-200": "234 248 235", // #eaf8eb
		"--color-tertiary-300": "221 244 223", // #ddf4df
		"--color-tertiary-400": "195 235 199", // #c3ebc7
		"--color-tertiary-500": "169 227 175", // #A9E3AF
		"--color-tertiary-600": "152 204 158", // #98cc9e
		"--color-tertiary-700": "127 170 131", // #7faa83
		"--color-tertiary-800": "101 136 105", // #658869
		"--color-tertiary-900": "83 111 86", // #536f56
		// success | #55B785 
		"--color-success-50": "230 244 237", // #e6f4ed
		"--color-success-100": "221 241 231", // #ddf1e7
		"--color-success-200": "213 237 225", // #d5ede1
		"--color-success-300": "187 226 206", // #bbe2ce
		"--color-success-400": "136 205 170", // #88cdaa
		"--color-success-500": "85 183 133", // #55B785
		"--color-success-600": "77 165 120", // #4da578
		"--color-success-700": "64 137 100", // #408964
		"--color-success-800": "51 110 80", // #336e50
		"--color-success-900": "42 90 65", // #2a5a41
		// warning | #EAB308 
		"--color-warning-50": "252 244 218", // #fcf4da
		"--color-warning-100": "251 240 206", // #fbf0ce
		"--color-warning-200": "250 236 193", // #faecc1
		"--color-warning-300": "247 225 156", // #f7e19c
		"--color-warning-400": "240 202 82", // #f0ca52
		"--color-warning-500": "234 179 8", // #EAB308
		"--color-warning-600": "211 161 7", // #d3a107
		"--color-warning-700": "176 134 6", // #b08606
		"--color-warning-800": "140 107 5", // #8c6b05
		"--color-warning-900": "115 88 4", // #735804
		// error | #EB6383 
		"--color-error-50": "252 232 236", // #fce8ec
		"--color-error-100": "251 224 230", // #fbe0e6
		"--color-error-200": "250 216 224", // #fad8e0
		"--color-error-300": "247 193 205", // #f7c1cd
		"--color-error-400": "241 146 168", // #f192a8
		"--color-error-500": "235 99 131", // #EB6383
		"--color-error-600": "212 89 118", // #d45976
		"--color-error-700": "176 74 98", // #b04a62
		"--color-error-800": "141 59 79", // #8d3b4f
		"--color-error-900": "115 49 64", // #733140
		// surface | #28272F 
		"--color-surface-50": "223 223 224", // #dfdfe0
		"--color-surface-100": "212 212 213", // #d4d4d5
		"--color-surface-200": "201 201 203", // #c9c9cb
		"--color-surface-300": "169 169 172", // #a9a9ac
		"--color-surface-400": "105 104 109", // #69686d
		"--color-surface-500": "40 39 47", // #28272F
		"--color-surface-600": "36 35 42", // #24232a
		"--color-surface-700": "30 29 35", // #1e1d23
		"--color-surface-800": "24 23 28", // #18171c
		"--color-surface-900": "20 19 23", // #141317
	}
}