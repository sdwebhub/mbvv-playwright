import { Page, expect } from '@playwright/test';
import { RentedSpaceDetails } from '../test-data/types';

export class RentedSpacePage {
  constructor(private page: Page, private data: RentedSpaceDetails) {}

  async waitForPage() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.getByLabel('Agreement Start Date *')).toBeVisible();
  }

  async fill() {
    await this.page.getByRole('textbox', { name: 'Address *' }).fill(this.data.address);
    await this.page.getByRole('textbox', { name: 'City' }).fill(this.data.city);
    await this.page.getByRole('textbox', { name: 'State' }).fill(this.data.state);
    await this.page.getByRole('textbox', { name: 'PIN Code' }).fill(this.data.pinCode);
    await this.page.getByLabel('Agreement Start Date *').pressSequentially(this.data.agreementStartDate);
    await this.page.getByLabel('Agreement End Date *').pressSequentially(this.data.agreementEndDate);
  }

  async next() {
    await this.page.getByRole('button', { name: 'Next' }).click();
    await expect(this.page.getByRole('radio', { name: 'Indian Citizen' })).toBeVisible();
  }
}
