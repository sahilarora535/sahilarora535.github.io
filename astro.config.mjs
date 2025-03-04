// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import starlightBlog from 'starlight-blog';

import d2 from 'astro-d2';

// https://astro.build/config
export default defineConfig({
    site: 'https://sahilarora.in',
    integrations: [starlight({
        plugins: [starlightBlog({
            title: 'Blog',
            postCount: 10,
            recentPostCount: 10,
        })],
        head: [{
            tag: 'script',
            attrs: {
                src: 'https://cloud.umami.is/script.js',
                'data-website-id': "6905ce4e-a9b4-4fa2-874b-566b98d63957",
                defer: true,
            }
        }],
        favicon: './src/assets/logo/logo-namaste-dark.png',
        title: 'Sahil Arora',
        description: 'Sahil Arora\'s personal blog and portfolio',
        logo: {
            src: './src/assets/logo/logo-meditate-dark.png',
        },
        lastUpdated: true,
        social: {
            linkedin: 'https://www.linkedin.com/in/sahilarora535/',
            github: 'https://github.com/sahilarora535',
            stackOverflow: 'https://stackoverflow.com/users/4554700/sahil-arora',
            email: 'mailto:sight-cyclops.0a@icloud.com',
        },
        tableOfContents: {
            minHeadingLevel: 1,
            maxHeadingLevel: 6,
        },
        customCss: ['./src/tailwind.css', '@fontsource/atkinson-hyperlegible/700.css', '@fontsource/atkinson-hyperlegible/400.css'],
        }), tailwind({ applyBaseStyles: false }), d2()],
});