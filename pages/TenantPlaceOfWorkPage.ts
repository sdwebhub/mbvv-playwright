import { Page, expect } from '@playwright/test';
import { TenantPlaceOfWork } from '../test-data/types';

export class TenantPlaceOfWorkPage {
  constructor(private page: Page, private data: TenantPlaceOfWork) {}

  async waitForPage() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.getByRole('textbox', { name: "Tenant's Mobile Number *" })).toBeVisible();
  }

  async fill() {
    await this.page.getByRole('textbox', { name: "Tenant's Mobile Number *" }).fill(this.data.mobileNumber);
    await this.page.getByRole('textbox', { name: 'E-mail ID *' }).fill(this.data.email);
    await this.page.getByRole('textbox', { name: "Tenant' Occupation *" }).fill(this.data.occupation);
    await this.page.getByRole('textbox', { name: 'Address of Tenant Place Of' }).fill(this.data.placeOfWork);
    await this.page.getByRole('textbox', { name: "Tenant's City/District *" }).fill(this.data.city);
    await this.page.getByRole('textbox', { name: 'State *' }).fill(this.data.state);
    await this.page.getByRole('textbox', { name: 'PIN Code *' }).fill(this.data.pinCode);
  }

  async next() {
    await this.page.getByRole('button', { name: 'Next' }).click();
    await expect(this.page.getByRole('textbox', { name: 'Person 1 Name *' })).toBeVisible();
  }
}
