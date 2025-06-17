import { test, expect } from '@playwright/test';

test('Simple Form Demo', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground');
  await page.click('text=Simple Form Demo');
  await expect(page).toHaveURL(/.*simple-form-demo/);

  const inputText = "Welcome to LambdaTest";
  await page.fill('#user-message', inputText);
  await page.click('#showInput');

  const result = await page.locator('#message').textContent();
  expect(result?.trim()).toBe(inputText);
});
