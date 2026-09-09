import { test, expect } from '../../../src/fixtures/page-fixtures';

test.describe('Smoke Test - Main Modules Navigation', () => {
    
    test.beforeEach(async ({ homePage }) => {
        // Before each test, we start at the home page
        await homePage.goto();
    });

    test('Should navigate correctly to the Shoes (Zapatos) module', async ({ page, homePage }) => {
        await homePage.header.navigateToShoes();
        // Asserting the URL changes correctly
        await expect(page).toHaveURL(/.*zapatos/i);
    });

    test('Should navigate correctly to the Bags (Bolsos) module', async ({ page, homePage }) => {
        await homePage.header.navigateToBags();
        await expect(page).toHaveURL(/.*bolsos/i);
    });

    test('Should navigate correctly to the Outlet module', async ({ page, homePage }) => {
        await homePage.header.navigateToOutlet();
        await expect(page).toHaveURL(/.*outlet/i);
    });
});