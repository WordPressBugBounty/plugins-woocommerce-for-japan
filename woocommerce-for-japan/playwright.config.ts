import { defineConfig, devices } from '@playwright/test';

const BASE_URL: string = ( process.env.WP_BASE_URL as string | undefined ) ?? 'http://localhost:8891';

export default defineConfig({
	testDir: './tests/e2e',
	timeout: 60_000,
	expect: { timeout: 10_000 },
	globalSetup: require.resolve( './tests/e2e/global-setup' ),
	fullyParallel: false,
	forbidOnly: !!( process.env.CI as string | undefined ),
	retries: ( process.env.CI as string | undefined ) ? 1 : 0,
	workers: 1,
	reporter: [ [ 'list' ], [ 'html', { open: 'never', outputFolder: 'tests/e2e/reports' } ] ],
	use: {
		baseURL: BASE_URL,
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
		video: 'on-first-retry',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices[ 'Desktop Chrome' ] },
		},
	],
} );
