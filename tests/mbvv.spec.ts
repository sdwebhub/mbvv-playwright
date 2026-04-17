import { test } from '@playwright/test';
import { SpaceOwnerPage } from '../pages/SpaceOwnerPage';
import { RentedSpacePage } from '../pages/RentedSpacePage';
import { TenantDetailsPage } from '../pages/TenantDetailsPage';
import { TenantPlaceOfWorkPage } from '../pages/TenantPlaceOfWorkPage';
import { PeopleWhoKnowTenantPage } from '../pages/PeopleWhoKnowTenantPage';
import { tenantCases } from '../test-data/owner-details';

test.beforeEach(async ({ page }) => {
  await page.goto('');
  await page.getByRole('button', { name: 'English' }).click();
});

for (const tenantCase of tenantCases) {
  test(`Tenant Information - ${tenantCase.caseName}`, async ({ page }, testInfo) => {
    const screenshots: { name: string; body: Buffer }[] = [];

    await test.step('Step 1 - Space Owner Details', async () => {
      const spaceOwnerPage = new SpaceOwnerPage(page, tenantCase.owner);
      await spaceOwnerPage.waitForPage();
      await spaceOwnerPage.fill();
      screenshots.push({ name: 'Step 1 - Space Owner Details', body: await page.screenshot({ fullPage: true }) });
      await spaceOwnerPage.next();
    });

    await test.step('Step 2 - Rented Space Details', async () => {
      const rentedSpacePage = new RentedSpacePage(page, tenantCase.rentedSpace);
      await rentedSpacePage.waitForPage();
      await rentedSpacePage.fill();
      screenshots.push({ name: 'Step 2 - Rented Space Details', body: await page.screenshot({ fullPage: true }) });
      await rentedSpacePage.next();
    });

    await test.step('Step 3 - Tenant Details', async () => {
      const tenantDetailsPage = new TenantDetailsPage(page, tenantCase.tenant);
      await tenantDetailsPage.waitForPage();
      await tenantDetailsPage.fill();
      screenshots.push({ name: 'Step 3 - Tenant Details', body: await page.screenshot({ fullPage: true }) });
      await tenantDetailsPage.next();
    });

    await test.step('Step 4 - Tenant\'s Place of Work', async () => {
      const tenantPlaceOfWorkPage = new TenantPlaceOfWorkPage(page, tenantCase.placeOfWork);
      await tenantPlaceOfWorkPage.waitForPage();
      await tenantPlaceOfWorkPage.fill();
      screenshots.push({ name: 'Step 4 - Tenant\'s Place of Work', body: await page.screenshot({ fullPage: true }) });
      await tenantPlaceOfWorkPage.next();
    });

    await test.step('Step 5 - People Who Know the Tenant', async () => {
      const peopleWhoKnowTenantPage = new PeopleWhoKnowTenantPage(page, tenantCase.peopleWhoKnow);
      await peopleWhoKnowTenantPage.waitForPage();
      await peopleWhoKnowTenantPage.fill();
      screenshots.push({ name: 'Step 5 - People Who Know the Tenant', body: await page.screenshot({ fullPage: true }) });
      await peopleWhoKnowTenantPage.certifyAndSubmit();
    });

    // Attach all screenshots together at the end
    for (const s of screenshots) {
      await testInfo.attach(s.name, { body: s.body, contentType: 'image/png' });
    }
  });
}
