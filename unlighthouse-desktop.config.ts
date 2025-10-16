import { concurrency } from 'sharp'
import { defineUnlighthouseConfig } from 'unlighthouse/config'

export default defineUnlighthouseConfig({
  site: 'https://sahilarora.in',
  scanner: {
    device: 'desktop',
    samples: 1,
  },
  ci: {
    buildStatic: true,
  },
  debug: true,
})
