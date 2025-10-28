// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';

import astroD2 from 'astro-d2';
import mermaid from 'astro-mermaid';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://sahilarora.in',

  integrations: [
    starlight({
      pagination: false,
      plugins: [starlightBlog({
          title: 'Blog',
          postCount: 10,
          recentPostCount: 10,
          metrics: {
            readingTime: true,
          },
      })],
      head: [{
          tag: 'script',
          attrs: {
              src: 'https://cloud.umami.is/script.js',
              'data-website-id': "6905ce4e-a9b4-4fa2-874b-566b98d63957",
              defer: true,
          }
      }],
      favicon: '/logo-meditate-dark.png',
      title: 'Sahil Arora',
      description: 'Sahil Arora\'s personal blog and portfolio',
      logo: {
          src: './src/assets/logo/logo-meditate-dark.png',
      },
      lastUpdated: true,
      social: [
          { icon: 'github', label: 'GitHub', href: 'https://github.com/sahilarora535' },
          { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/sahilarora535/' },
          { icon: 'stackOverflow', label: 'StackOverflow', href: 'https://stackoverflow.com/users/4554700/sahil-arora' },
          { icon: 'email', label: 'EMail', href: 'mailto:sight-cyclops.0a@icloud.com' }
      ],
      tableOfContents: {
          minHeadingLevel: 1,
          maxHeadingLevel: 6,
      },
      customCss: ['./src/styles/global.css', '@fontsource-variable/inter', '@fontsource-variable/fira-code', '@fontsource/bbh-sans-bogle'],
      }),
    astroD2({
      layout: 'elk',
      sketch: true,
    }),
    mermaid(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    layout: 'constrained',
    responsiveStyles: true,
  }
});