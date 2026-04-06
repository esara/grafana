import { test, expect } from './fixtures';
import { dismissBlockingPortals } from './dismissBlockingPortals';

test('should be possible to save app configuration', async ({ appConfigPage, page }) => {
  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  await dismissBlockingPortals(page);

  // Click the Configuration tab first to ensure we're on the right page
  const configurationTab = page.locator('[data-testid="data-testid Tab Configuration"]');
  await configurationTab.waitFor({ state: 'visible' });
  if ((await configurationTab.getAttribute('aria-selected')) !== 'true') {
    await configurationTab.click();
  }
  await page.waitForLoadState('networkidle');

  // enter some valid values
  await page.getByRole('textbox', { name: 'Causely ClientId' }).fill('abcd');
  await page.getByRole('textbox', { name: 'Causely Secret' }).fill('secret');
  await page.getByRole('textbox', { name: 'Causely Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Causely Password' }).fill('password');
  await page.getByRole('textbox', { name: 'Causely Domain' }).fill('causely.app');

  // listen for the server response on the saved form
  const saveResponse = appConfigPage.waitForSettingsResponse();

  await page.getByRole('button', { name: /Save Causely Credentials/i }).click();
  await expect(saveResponse).toBeOK();
});
