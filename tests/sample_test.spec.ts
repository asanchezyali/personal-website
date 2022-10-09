import { test, expect } from '@playwright/test'

test('Expect true to be truthy', async ({ page }) => {
  /**
   * Check out docs:
   *   https://playwright.dev/docs/intro#first-test
   *   https://nextjs.org/docs/testing#creating-your-first-playwright-end-to-end-test
  */
  expect(true).toBeTruthy()
})
