import { Page, expect } from '@playwright/test';
import path from 'path';
import { OwnerDetails } from '../test-data/types';

export class SpaceOwnerPage {
  constructor(private page: Page, private data: OwnerDetails) {}

  async waitForPage() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.getByLabel('Select Police Station *')).toBeVisible();
  }

  async fill() {
    await this.page.getByLabel('Select Police Station *').selectOption({ label: this.data.policeStation });
    await this.page.locator('input[type="file"]').setInputFiles(
      path.resolve(__dirname, '../test-data/photos', this.data.photo)
    );
    await this.page.getByRole('textbox', { name: 'Full Name *' }).fill(this.data.fullName);
    await this.page.getByRole('textbox', { name: 'Contact No *' }).fill(this.data.contactNo);
    await this.page.getByRole('textbox', { name: 'E-mail ID *' }).fill(this.data.email);
    await this.page.getByRole('textbox', { name: 'Address' }).fill(this.data.address);
    await this.page.getByRole('textbox', { name: 'City' }).fill(this.data.city);
    await this.page.getByRole('textbox', { name: 'State' }).fill(this.data.state);
    await this.page.getByRole('textbox', { name: 'PIN Code' }).fill(this.data.pinCode);
  }

  async next() {
    await this.page.getByRole('button', { name: 'Next' }).click();
    await expect(this.page.getByLabel('Agreement Start Date *')).toBeVisible();
  }
}
