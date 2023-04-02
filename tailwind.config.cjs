/* eslint-disable @typescript-eslint/no-var-requires */
const config = {
	mode: 'jit',
	content: [
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
		'./src/packages/tutors-reader-lib/src/**/*.{html,js,svelte,ts}',
		'./src/packages/tutors-ui/lib/**/**/*.{html,js,svelte,ts}',
		'./src/**/**/*.{html,js,svelte,ts}',
		'./src/**/*.{html,js,svelte,ts}'
	],
	safelist: [
		{
			pattern: /border|text/
		}
	],
	plugins: [
		require('@tailwindcss/typography'),
		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
	],
	darkMode: 'class'
};

module.exports = config;
