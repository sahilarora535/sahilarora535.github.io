// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import starlightBlog from 'starlight-blog';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			plugins: [starlightBlog()],
			title: 'Sahil Arora',
			social: {
				linkedin: 'https://www.linkedin.com/in/sahilarora535/',
				github: 'https://github.com/sahilarora535',
				stackOverflow: 'https://stackoverflow.com/users/4554700/sahil-arora',
				email: 'mailto:sight-cyclops.0a@icloud.com',
			},
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
			customCss: ['./src/tailwind.css'],
		}),
		tailwind({ applyBaseStyles: false }),
	],
});
