export function PROCESS_ID(): string {
	switch (import.meta.env.MODE) {
		case 'development': {
			return '1QfrANGVXZ7qeMnL2JyH85hJQN8TxwW7THbArRK9zZc';
		}
		case 'staging': {
			return 'FwSncCmdeiZrHh42RVy9Hywm2hT2dnST0oVMmMWkSnM';
		}
		case 'production': {
			return 'vW8uSO0_wvVD787UwxrPWobXbwdZjSRg3Lsj9fvSRnY';
		}
	}
	return '1QfrANGVXZ7qeMnL2JyH85hJQN8TxwW7THbArRK9zZc';
}
