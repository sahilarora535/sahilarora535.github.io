// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import starlightBlog from 'starlight-blog';

// https://astro.build/config
export default defineConfig({
	site: 'https://sahilarora.in',
	integrations: [
		starlight({
			plugins: [starlightBlog()],
			title: 'Sahil Arora',
			description: 'Sahil Arora\'s personal blog and portfolio',
			logo: {
				light: './src/assets/logo/logo-hi-light.png',
				dark: './src/assets/logo/logo-hi-dark.png',
			},
			social: {
				linkedin: 'https://www.linkedin.com/in/sahilarora535/',
				github: 'https://github.com/sahilarora535',
				stackOverflow: 'https://stackoverflow.com/users/4554700/sahil-arora',
				email: 'mailto:sight-cyclops.0a@icloud.com',
			},
			tableOfContents: true,
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
			customCss: ['./src/tailwind.css', '@fontsource/atkinson-hyperlegible/700.css', '@fontsource/atkinson-hyperlegible/400.css'],
		}),
		tailwind({ applyBaseStyles: false }),
	],
});
