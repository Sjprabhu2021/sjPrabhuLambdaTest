import { test, expect } from '@playwright/test';

test('Input Form Submit - end-to-end', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground');
  await page.getByRole('link', { name: 'Input Form Submit' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.fill('input[name="name"]', 'Siva Jothi');
  await page.fill('#inputEmail4', 'siva@gmail.com');
  await page.fill('#inputPassword4', 'TestingLamda');
  await page.fill('#company', 'Tata');
  await page.fill('#websitename', 'https://example.com');
  await page.selectOption('select[name="country"]', { label: 'India' });
  await page.fill('#inputCity', 'Chennai');
  await page.fill('#inputAddress1', 'Madipakkam');
  await page.fill('#inputAddress2', 'Chennai');
  await page.fill('#inputState', 'Tamil Nadu');
  await page.fill('#inputZip', '10001');

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.locator('.success-msg.hidden')).toHaveText(
    'Thanks for contacting us, we will get back to you shortly.'
  );
});
