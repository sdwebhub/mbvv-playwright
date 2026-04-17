# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/mbvv.spec.ts

# Run a single test by name
npx playwright test -g "Tenant Information"

# Debug a test (opens Playwright Inspector)
npx playwright test --debug

# Record new test with codegen
npx playwright codegen https://mbvv.mahapolice.gov.in/tenant-info/

# Generate and open Allure report
npm run allure:report

# Generate Allure report only
npm run allure:generate

# Open already generated Allure report
npm run allure:open

# Serve Allure report directly from results
npm run allure:serve
```

## Architecture

Playwright E2E test project for **Mira-Bhayandar, Vasai-Virar Police — Tenant Information Form** (`https://mbvv.mahapolice.gov.in/tenant-info/`).

### Configuration ([playwright.config.ts](playwright.config.ts))
- Environment loaded from [.env.playwright](.env.playwright) — configure `BASE_URL`, `BROWSER`, `WORKERS`, `HEADLESS` there
- Default browser: **Chromium**, headed mode, 1 worker, maximized window
- Reporters: **Allure only** (results in `allure-results/`, report in `allure-report/`)
- Traces collected on first retry

### Environment ([.env.playwright](.env.playwright))
```
BASE_URL=https://mbvv.mahapolice.gov.in/tenant-info/
BROWSER=chromium
WORKERS=1
HEADLESS=false
```

### Project Structure
```
pages/                        # Page Object Model — one class per form step
  SpaceOwnerPage.ts           # Step 1 — Space Owner Details
  RentedSpacePage.ts          # Step 2 — Details of Rented Space
  TenantDetailsPage.ts        # Step 3 — Tenant Details
  TenantPlaceOfWorkPage.ts    # Step 4 — Tenant's Place of Work
  PeopleWhoKnowTenantPage.ts  # Step 5 — People Who Know the Tenant

test-data/
  owner-details.ts            # All test data exports (ownerDetails, rentedSpaceDetails, tenantDetails, tenantPlaceOfWork, peopleWhoKnowTenant)
  photos/                     # Test photo uploads (owner_pic.jpeg, tenant.png, tenant_proof.png)

tests/
  mbvv.spec.ts                # Main E2E test — Tenant Information end-to-end
```

### Page Object Pattern
Each page class has three methods:
- `waitForPage()` — waits for network idle + asserts a key element is visible
- `fill()` — fills all form fields using test data
- `next()` — clicks Next and asserts the next page loaded

### Test Data ([test-data/owner-details.ts](test-data/owner-details.ts))
All form data is centralized here. Update values here — no need to touch test or page files.

### Locator Strategy
- Prefer `getByRole('textbox', { name: '...' })` — stable, accessible
- `getByLabel()` for dropdowns and date fields
- `.nth()` only where the app provides no unique labels (Step 3 — confirmed via codegen)
- Avoid CSS/XPath selectors

### reCAPTCHA Handling
Step 5 pauses before reCAPTCHA for manual completion:
1. Test fills all fields and checks "I certify" automatically
2. Playwright Inspector opens — solve the CAPTCHA manually in the browser
3. Click **Resume** in the Inspector to continue

To fully automate, ask the dev team to use Google's test reCAPTCHA keys in the test environment:
- Site key: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
- Secret key: `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`

### Generated Output (all gitignored)
- `allure-results/` — raw Allure results
- `allure-report/` — generated Allure HTML report
- `test-results/` — raw results and traces
- `playwright-report/` — Playwright HTML report (not used)
