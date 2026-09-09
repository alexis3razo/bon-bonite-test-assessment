import { test, expect } from '../../../src/fixtures/page-fixtures';
import { generateUserData } from '../../../src/utils/data-generator';

test.describe('User Registration and Account Management', () => {
    // Generate fresh data for this specific test suite run
    const userData = generateUserData();

    test('Should register a new user and update profile information successfully', async ({ homePage, registerPage, accountPage }) => {
        
        await test.step('Navigate to the registration/login page', async () => {
            await homePage.goto();
            await homePage.header.clickMyAccount();
        });

        await test.step('Register a new user with dynamically generated data', async () => {
            await registerPage.registerUser(userData.email, userData.password);
            
            // Verify the actual success message class/text in bon-bonite.com
            const welcomeMessage = await registerPage.getWelcomeMessage();
            expect(welcomeMessage).not.toBeNull(); 
        });

        await test.step('Navigate to account details and update personal information', async () => {
            await accountPage.goToAccountDetails();
            await accountPage.updatePersonalInformation(userData.firstName, userData.lastName);
            
            const successMessage = await accountPage.getUpdateSuccessMessage();
            // This string might vary depending on the site's language/setup
            expect(successMessage).toContain('modificado correctamente'); 
        });

    });
});