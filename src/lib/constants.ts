export const COOKIE_MAX_AGE = 60 * 60 * 24; // 1 day
export const AUTH_COOKIE_NAME = 'auth_token';
export const THEME_LIST: { label: string; value: 'light' | 'dark' | 'system' }[] = [
	{
		label: '☀️ Light',
		value: 'light'
	},
	{
		label: '🌑 Dark',
		value: 'dark'
	},
	{
		label: '⚙️ System',
		value: 'system'
	}
];
