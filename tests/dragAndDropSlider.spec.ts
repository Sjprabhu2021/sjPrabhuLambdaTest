import { test, expect } from '@playwright/test';

test('Drag "Default value 15" slider to 95', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground');
  await page.click('text=Drag & Drop Sliders');
  const sliderContainer = page.locator('h4', { hasText: 'Default value 15' }).locator('..');
  const slider = sliderContainer.locator('input[type="range"]');
  const output = sliderContainer.locator('output');
  await expect(slider).toBeVisible();
  const box = await slider.boundingBox();
  if (box) {
    const startX = box.x + 1;
    const y = box.y + box.height / 2;

    await page.mouse.move(startX, y);
    await page.mouse.down();
    await page.mouse.move(startX + box.width * 0.927, y, { steps: 10 });
    await page.mouse.up();
  }

  await expect(output).toHaveText('95');
});
