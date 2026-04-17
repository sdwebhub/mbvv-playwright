# MBVV Playwright Test Project

End-to-end automation for the **Mira-Bhayandar, Vasai-Virar Police — Tenant Information Form**.

> Application URL: https://mbvv.mahapolice.gov.in/tenant-info/

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/)

---

## Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

---

## Configuration

All environment settings are in [.env.playwright](.env.playwright):

| Variable    | Default                                         | Description                |
|-------------|--------------------------------------------------|----------------------------|
| `BASE_URL`  | `https://mbvv.mahapolice.gov.in/tenant-info/`  | Application URL            |
| `BROWSER`   | `chromium`                                      | Browser to run tests in    |
| `WORKERS`   | `1`                                             | Number of parallel workers |
| `HEADLESS`  | `false`                                         | Run browser in headless mode |

---

## Running Tests

```bash
# Run all tests
npm test

# Run with Playwright debug inspector
npx playwright test --debug

# Record a new test with codegen
npx playwright codegen https://mbvv.mahapolice.gov.in/tenant-info/
```

---

## Reports

This project uses **Allure** for test reporting.

```bash
# Run tests + generate + open report (all in one)
npm run allure:report
```

Screenshots of each form step are automatically attached to the Allure report.

---

## Project Structure

```
mbvv-playwright-project/
│
├── pages/                          # Page Object Model
│   ├── SpaceOwnerPage.ts           # Step 1 — Space Owner Details
│   ├── RentedSpacePage.ts          # Step 2 — Details of Rented Space
│   ├── TenantDetailsPage.ts        # Step 3 — Tenant Details
│   ├── TenantPlaceOfWorkPage.ts    # Step 4 — Tenant's Place of Work
│   └── PeopleWhoKnowTenantPage.ts  # Step 5 — People Who Know the Tenant
│
├── test-data/
│   ├── types.ts                    # TypeScript interfaces for all data shapes
│   ├── owner-details.ts            # tenantCases[] array — one entry per test run
│   └── photos/                     # Upload files (owner photo, tenant photo, ID proof)
│
├── tests/
│   └── mbvv.spec.ts                # Main E2E test — one test generated per tenant case
│
├── .env.playwright                 # Environment configuration
├── playwright.config.ts            # Playwright configuration
└── package.json
```

---

## Test Data & Multiple Cases

Test data is centralised in [test-data/owner-details.ts](test-data/owner-details.ts) as a `tenantCases` array. Each entry in the array generates one independent test that runs the complete 5-step form.

### Adding a new tenant case

1. Add a new object to `tenantCases[]` in `test-data/owner-details.ts` — a commented template is provided at the bottom of the file
2. Add the corresponding photo files to `test-data/photos/`
3. Set `WORKERS` in `.env.playwright` to match the number of active cases

### Running cases in parallel

```
# .env.playwright
WORKERS=2   # set to the number of cases in tenantCases[]
```

Each worker gets its own browser instance and fills the form independently using its case data.

---

## Test Coverage

One E2E test is generated per tenant case, covering the complete 5-step form:

| Step | Page | Fills / Validates |
|------|------|-------------------|
| 1 | Space Owner Details | Police station, owner photo, name, contact, email, address |
| 2 | Details of Rented Space | Address, agreement start/end dates |
| 3 | Tenant Details | Citizen type, photo, name, address, identity proof, co-residents |
| 4 | Tenant's Place of Work | Mobile, email, occupation, work address |
| 5 | People Who Know the Tenant | Two references, agent details, certification, reCAPTCHA |

---

## reCAPTCHA

Step 5 requires manual reCAPTCHA completion. The test will **pause automatically** — solve the CAPTCHA in the browser, then click **Resume** in the Playwright Inspector.

To fully automate, request the dev team to configure Google's test reCAPTCHA keys in the test/staging environment.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Playwright](https://playwright.dev/) | ^1.59.1 | Browser automation |
| [TypeScript](https://www.typescriptlang.org/) | via `@types/node` | Type safety |
| [Allure](https://allurereport.org/) | ^3.7.1 | Test reporting |
