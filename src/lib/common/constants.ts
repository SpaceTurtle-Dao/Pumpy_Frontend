export function PROCESS_ID(): string {
	switch (import.meta.env.MODE) {
		case 'development': {
			return 'rJnW3lKBn2HLInJ58ylhAfXoOXq7NfDboZJTt76mD0U';
		}
		case 'staging': {
			return 'FwSncCmdeiZrHh42RVy9Hywm2hT2dnST0oVMmMWkSnM';
		}
		case 'production': {
			return 'vW8uSO0_wvVD787UwxrPWobXbwdZjSRg3Lsj9fvSRnY';
		}
	}
	return 'rJnW3lKBn2HLInJ58ylhAfXoOXq7NfDboZJTt76mD0U';
}
