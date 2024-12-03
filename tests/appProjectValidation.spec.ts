import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { loginToApp, verifyCardInColumn } from '../utils/helpers';

interface TestData {
  project: string;
  projectNameLong: string;
  columnTitle: string;
  columnLocator: string;
  cardTitle: string;
  tags: string[];
}

const testDataPath = path.resolve(__dirname, 'data', 'projectData.json');
let projectData: TestData[];

try {
  const rawData = fs.readFileSync(testDataPath, 'utf8');
  projectData = JSON.parse(rawData) as TestData[];
} catch (error) {
  console.error('Error reading or parsing projectData.json:', error);
  process.exit(1);
}

test.describe('loopqa scrum board tests', () => {
  projectData.forEach((projectData) => {
    test(`validating project: '${projectData.project}' card: '${projectData.cardTitle}' tags: '${projectData.tags}'`, async ({
      page,
    }) => {
      await test.step('log in and confirm logged in', async () => {
        await loginToApp(page);
      });

      await test.step(`navitage to '${projectData.projectNameLong}', Project`, async () => {
        // Asserting button is enabled before interacting with it
        await expect(
          page.getByRole('button', { name: projectData.projectNameLong })
        ).toBeEnabled();
        // Clicking on desired project
        await page
          .getByRole('button', { name: projectData.projectNameLong })
          .click();
        // Asserting page has loaded post click
        await expect(
          page
            .getByRole('banner')
            .getByRole('heading', { name: projectData.project })
        ).toBeVisible();
      });

      await test.step(`Verify '${projectData.cardTitle}' is in the '${projectData.columnTitle}' column and has tags: '${projectData.tags}'`, async () => {
        await verifyCardInColumn(page, projectData);
      });
    });
  });
});
