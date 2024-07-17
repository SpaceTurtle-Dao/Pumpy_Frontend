export function PROCESS_ID(): string {
	switch (import.meta.env.MODE) {
		case 'development': {
			return 'B_zteC-JBIvwZwrkllUX1Ism7byXNhY8HYcp_x7pJGc';
		}
		case 'staging': {
			return 'FwSncCmdeiZrHh42RVy9Hywm2hT2dnST0oVMmMWkSnM';
		}
		case 'production': {
			return 'vW8uSO0_wvVD787UwxrPWobXbwdZjSRg3Lsj9fvSRnY';
		}
	}
	return 'B_zteC-JBIvwZwrkllUX1Ism7byXNhY8HYcp_x7pJGc';
}
