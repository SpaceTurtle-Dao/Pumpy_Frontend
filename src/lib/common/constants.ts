export function PROCESS_ID(): string {
	switch (import.meta.env.MODE) {
		case 'development': {
			return 'pO1XaI8odWETO6cdUrrjt_gJSXXpzmRY4WXza_ihYDI';
		}
		case 'staging': {
			return 'FwSncCmdeiZrHh42RVy9Hywm2hT2dnST0oVMmMWkSnM';
		}
		case 'production': {
			return 'vW8uSO0_wvVD787UwxrPWobXbwdZjSRg3Lsj9fvSRnY';
		}
	}
	return 'pO1XaI8odWETO6cdUrrjt_gJSXXpzmRY4WXza_ihYDI';
}
