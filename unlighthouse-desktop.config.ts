import { concurrency } from 'sharp'
import { defineUnlighthouseConfig } from 'unlighthouse/config'

export default defineUnlighthouseConfig({
  site: 'https://sahilarora.in',
  scanner: {
    device: 'desktop',
    samples: 3,
  },
  ci: {
    buildStatic: true,
  },
  debug: true,
})
