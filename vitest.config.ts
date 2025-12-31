import { configDefaults, defineConfig } from 'vitest/config'
import { webdriverio } from '@vitest/browser-webdriverio'


export default defineConfig({
  resolve: {
    conditions: [
      'node',
      'module'
    ]
  },
  test: {
    exclude: [...configDefaults.exclude],
    browser: {
      connectTimeout: 5000,
      provider: webdriverio(),
      enabled: true,
      headless: true,
      screenshotFailures: false,
      instances: [{
        browser: 'chrome'
      }]
    }
  }
})