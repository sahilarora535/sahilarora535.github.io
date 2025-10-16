import { defineUnlighthouseConfig } from 'unlighthouse/config'

export default defineUnlighthouseConfig({
  site: 'https://sahilarora.in',
  scanner: {
    device: 'mobile',
    samples: 1,
  },
  debug: true,
})
