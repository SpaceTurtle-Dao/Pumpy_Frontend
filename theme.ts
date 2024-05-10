
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "0 0 0",
		// =~= Theme Colors  =~=
		// primary | #07843f 
		"--color-primary-50": "218 237 226", // #daede2
		"--color-primary-100": "205 230 217", // #cde6d9
		"--color-primary-200": "193 224 207", // #c1e0cf
		"--color-primary-300": "156 206 178", // #9cceb2
		"--color-primary-400": "81 169 121", // #51a979
		"--color-primary-500": "7 132 63", // #07843f
		"--color-primary-600": "6 119 57", // #067739
		"--color-primary-700": "5 99 47", // #05632f
		"--color-primary-800": "4 79 38", // #044f26
		"--color-primary-900": "3 65 31", // #03411f
		// secondary | #6765ae 
		"--color-secondary-50": "232 232 243", // #e8e8f3
		"--color-secondary-100": "225 224 239", // #e1e0ef
		"--color-secondary-200": "217 217 235", // #d9d9eb
		"--color-secondary-300": "194 193 223", // #c2c1df
		"--color-secondary-400": "149 147 198", // #9593c6
		"--color-secondary-500": "103 101 174", // #6765ae
		"--color-secondary-600": "93 91 157", // #5d5b9d
		"--color-secondary-700": "77 76 131", // #4d4c83
		"--color-secondary-800": "62 61 104", // #3e3d68
		"--color-secondary-900": "50 49 85", // #323155
		// tertiary | #fdb6ae 
		"--color-tertiary-50": "255 244 243", // #fff4f3
		"--color-tertiary-100": "255 240 239", // #fff0ef
		"--color-tertiary-200": "255 237 235", // #ffedeb
		"--color-tertiary-300": "254 226 223", // #fee2df
		"--color-tertiary-400": "254 204 198", // #feccc6
		"--color-tertiary-500": "253 182 174", // #fdb6ae
		"--color-tertiary-600": "228 164 157", // #e4a49d
		"--color-tertiary-700": "190 137 131", // #be8983
		"--color-tertiary-800": "152 109 104", // #986d68
		"--color-tertiary-900": "124 89 85", // #7c5955
		// success | #e12d2e 
		"--color-success-50": "251 224 224", // #fbe0e0
		"--color-success-100": "249 213 213", // #f9d5d5
		"--color-success-200": "248 203 203", // #f8cbcb
		"--color-success-300": "243 171 171", // #f3abab
		"--color-success-400": "234 108 109", // #ea6c6d
		"--color-success-500": "225 45 46", // #e12d2e
		"--color-success-600": "203 41 41", // #cb2929
		"--color-success-700": "169 34 35", // #a92223
		"--color-success-800": "135 27 28", // #871b1c
		"--color-success-900": "110 22 23", // #6e1617
		// warning | #1d85a7 
		"--color-warning-50": "221 237 242", // #ddedf2
		"--color-warning-100": "210 231 237", // #d2e7ed
		"--color-warning-200": "199 225 233", // #c7e1e9
		"--color-warning-300": "165 206 220", // #a5cedc
		"--color-warning-400": "97 170 193", // #61aac1
		"--color-warning-500": "29 133 167", // #1d85a7
		"--color-warning-600": "26 120 150", // #1a7896
		"--color-warning-700": "22 100 125", // #16647d
		"--color-warning-800": "17 80 100", // #115064
		"--color-warning-900": "14 65 82", // #0e4152
		// error | #036061 
		"--color-error-50": "217 231 231", // #d9e7e7
		"--color-error-100": "205 223 223", // #cddfdf
		"--color-error-200": "192 215 216", // #c0d7d8
		"--color-error-300": "154 191 192", // #9abfc0
		"--color-error-400": "79 144 144", // #4f9090
		"--color-error-500": "3 96 97", // #036061
		"--color-error-600": "3 86 87", // #035657
		"--color-error-700": "2 72 73", // #024849
		"--color-error-800": "2 58 58", // #023a3a
		"--color-error-900": "1 47 48", // #012f30
		// surface | #c5c4d6 
		"--color-surface-50": "246 246 249", // #f6f6f9
		"--color-surface-100": "243 243 247", // #f3f3f7
		"--color-surface-200": "241 240 245", // #f1f0f5
		"--color-surface-300": "232 231 239", // #e8e7ef
		"--color-surface-400": "214 214 226", // #d6d6e2
		"--color-surface-500": "197 196 214", // #c5c4d6
		"--color-surface-600": "177 176 193", // #b1b0c1
		"--color-surface-700": "148 147 161", // #9493a1
		"--color-surface-800": "118 118 128", // #767680
		"--color-surface-900": "97 96 105", // #616069
		
	}
}