import { Page, expect } from '@playwright/test';
import path from 'path';
import { TenantDetails } from '../test-data/types';

export class TenantDetailsPage {
  constructor(private page: Page, private data: TenantDetails) {}

  async waitForPage() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.getByRole('radio', { name: 'Indian Citizen' })).toBeVisible();
  }

  async fill() {
    await this.page.getByRole('radio', { name: 'Indian Citizen' }).check();
    await this.page.locator('input[type="file"]').first().setInputFiles(
      path.resolve(__dirname, '../test-data/photos', this.data.photo)
    );
    // Fields lack unique labels in DOM — nth() indices confirmed via codegen
    // nth(0) = file input area, nth(1) = Name, nth(2) = Address, nth(3) = City, nth(4) = State, nth(5) = Pincode
    await this.page.getByRole('textbox').nth(1).fill(this.data.name);
    await this.page.getByRole('textbox').nth(2).fill(this.data.address);
    await this.page.getByRole('textbox').nth(3).fill(this.data.city);
    await this.page.getByRole('textbox').nth(4).fill(this.data.state);
    await this.page.getByRole('textbox').nth(5).fill(this.data.pinCode);
    await this.page.getByRole('combobox').nth(1).selectOption({ label: this.data.identityProof });
    await this.page.getByRole('textbox', { name: 'digits' }).fill(this.data.identityProofNumber);
    await this.page.getByRole('spinbutton').first().fill(this.data.coResidents.male);
    await this.page.getByRole('spinbutton').nth(1).fill(this.data.coResidents.female);
    await this.page.getByRole('spinbutton').nth(2).fill(this.data.coResidents.children);
    await this.page.locator('input[type="file"]').last().setInputFiles(
      path.resolve(__dirname, '../test-data/photos', this.data.identityProofFile)
    );
  }

  async next() {
    await this.page.getByRole('button', { name: 'Next' }).click();
    await expect(this.page.getByRole('textbox', { name: "Tenant's Mobile Number *" })).toBeVisible();
  }
}
