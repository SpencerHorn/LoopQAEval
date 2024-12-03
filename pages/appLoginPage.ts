import { type Locator, type Page } from 'playwright-core';

export class LoginPage {
  readonly page: Page;
  usernameField: Locator;
  passwordField: Locator;
  appSignInButton: Locator;

  constructor(page: Page) {
    this.usernameField = page.getByLabel('Username', { exact: true });
    this.passwordField = page.getByLabel('Password', { exact: true });
    this.appSignInButton = page.getByRole('button', {
      name: 'Sign in',
      exact: true,
    });
  }

  async fillUsernameField(username: string) {
    await this.usernameField.fill(username);
  }

  async fillPasswordField(password: string) {
    await this.passwordField.fill(password);
  }

  async clickAppSignInButton() {
    await this.appSignInButton.click();
  }
}
