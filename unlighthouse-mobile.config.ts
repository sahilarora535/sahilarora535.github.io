import { defineUnlighthouseConfig } from 'unlighthouse/config'

export default defineUnlighthouseConfig({
  site: 'https://www2.sahilarora.in',
  scanner: {
    device: 'mobile',
    samples: 1,
  },
  debug: true,
})
