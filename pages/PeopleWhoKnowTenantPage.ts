import { Page, expect } from '@playwright/test';
import { PeopleWhoKnowTenant } from '../test-data/types';

export class PeopleWhoKnowTenantPage {
  constructor(private page: Page, private data: PeopleWhoKnowTenant) {}

  async waitForPage() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.getByRole('textbox', { name: 'Person 1 Name *' })).toBeVisible();
  }

  async fill() {
    await this.page.getByRole('textbox', { name: 'Person 1 Name *' }).fill(this.data.person1Name);
    await this.page.getByRole('textbox', { name: 'Contact number 1 *' }).fill(this.data.person1Contact);
    await this.page.getByRole('textbox', { name: 'Person 2 Name *' }).fill(this.data.person2Name);
    await this.page.getByRole('textbox', { name: 'Contact number 2 *' }).fill(this.data.person2Contact);
    await this.page.getByRole('textbox', { name: 'Agent Name' }).fill(this.data.agentName);
    await this.page.getByRole('textbox', { name: 'Agent Details' }).fill(this.data.agentDetails);
  }

  async certifyAndSubmit() {
    await this.page.locator('label:has-text("I certify"), input[type="checkbox"]').last().click();
    await this.page.pause(); // Pause for manual reCAPTCHA completion - click Resume after solving
    await this.page.frameLocator('iframe[title="reCAPTCHA"]').getByRole('checkbox', { name: "I'm not a robot" }).click();
  }
}
