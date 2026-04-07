import type { Page } from '@playwright/test';

/**
 * Grafana may show announcements in #grafana-portal-container that intercept pointer events
 * (e.g. "Grafana Assistant is now available to OSS users"), breaking tab clicks in plugin e2e.
 */
export async function dismissBlockingPortals(page: Page): Promise<void> {
  const portal = page.locator('#grafana-portal-container');
  const assistantHeading = page.getByRole('heading', {
    name: /Grafana Assistant is now available/i,
  });

  try {
    await assistantHeading.waitFor({ state: 'visible', timeout: 5000 });
  } catch {
    return;
  }

  await page.keyboard.press('Escape');

  try {
    await assistantHeading.waitFor({ state: 'hidden', timeout: 5000 });
    return;
  } catch {
    // Escape did not close it; try common dismiss controls inside the portal.
  }

  const dismissNames = [/^Close$/i, /^Dismiss$/i, /Not now/i, /Maybe later/i, /Got it/i];
  for (const name of dismissNames) {
    const btn = portal.getByRole('button', { name });
    // eslint-disable-next-line no-await-in-loop -- try one dismiss control at a time
    await btn.click({ timeout: 2000 }).catch(() => {});
    // eslint-disable-next-line no-await-in-loop
    if (await assistantHeading.isHidden().catch(() => true)) {
      return;
    }
  }

  await assistantHeading.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
}
