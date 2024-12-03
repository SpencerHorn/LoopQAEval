import { Page } from 'playwright';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/appLoginPage';

export async function loginToApp(page: Page) {
  const loginPage = new LoginPage(page);
  await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
  await expect(loginPage.usernameField).toBeEditable();
  await loginPage.fillUsernameField('admin');
  await expect(loginPage.passwordField).toBeEditable();
  await loginPage.fillPasswordField('password123');
  await expect(loginPage.appSignInButton).toBeEnabled();
  await loginPage.clickAppSignInButton();
}

export async function verifyCardInColumn(
  page: Page,
  testData: {
    columnTitle: string;
    columnLocator: string;
    cardTitle: string;
    tags: string[];
  }
) {
  const currentColumn = page.locator(testData.columnLocator);
  const cardSelector = currentColumn.getByRole('heading', {
    name: testData.cardTitle,
  });
  // Test requirement asserting the expected column is visible
  await expect(currentColumn).toContainText(testData.columnTitle);
  // Test requirement asserting the specified card is in the correct column
  await expect(cardSelector).toBeVisible();
  // Test requirement asserting each specfic card has the expects tags attached
  for (const tag of testData.tags) {
    const tagSelector = currentColumn
      .locator('div.flex.flex-wrap.gap-2.mb-3')
      .filter({ hasText: tag });
    await expect(tagSelector).toBeVisible();
  }
}
