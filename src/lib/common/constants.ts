export const IC_URL = 'https://icp0.io';
export const IC_LOCAL = 'http://localhost:8000';

export function PIONEER_ID(): string {
	switch (import.meta.env.MODE) {
		case 'development': {
			return 'x2ble-2aaaa-aaaak-qiknq-cai';
		}
		case 'staging': {
			return 'ucgwg-baaaa-aaaak-qibva-cai';
		}
		case 'production': {
			return 'yxccl-myaaa-aaaak-qihga-cai';
		}
	}
	return 'x2ble-2aaaa-aaaak-qiknq-cai';
}

export const USDC = 'xevnm-gaaaa-aaaar-qafnq-cai';
export const ICP = 'ryjl3-tyaaa-aaaaa-aaaba-cai';
