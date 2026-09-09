import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from '../components/Header';

export class AccountPage extends BasePage {
    public readonly header: Header;

    // Locators for the Account Dashboard navigation
    private readonly accountDetailsTab: Locator;
    
    // Locators for the profile editing form
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly saveChangesButton: Locator;
    private readonly successAlertMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.header = new Header(page);

        this.accountDetailsTab = page.locator('a, button').filter({ hasText: /detalles de la cuenta|mis datos|mi cuenta/i }).first();

        this.firstNameInput = page.locator('input#account_first_name, input[name*="first"]').first();
        this.lastNameInput = page.locator('input#account_last_name, input[name*="last"]').first();
        this.saveChangesButton = page.locator('button:has-text("Guardar"), button:has-text("Guardar los cambios"), button:has-text("Actualizar")').first();

        this.successAlertMessage = page.locator('.woocommerce-message, [role="status"], .success').first();
    }

    /**
     * Navigates to the Account Details tab inside the user dashboard.
     */
    async goToAccountDetails(): Promise<void> {
        await this.clickElement(this.accountDetailsTab);
        await this.waitForPageLoad();
    }

    /**
     * Updates the user's personal information.
     * 
     * @param firstName - The new first name to be updated
     * @param lastName - The new last name to be updated
     */
    async updatePersonalInformation(firstName: string, lastName: string): Promise<void> {
        // Clearing the inputs before typing is a good practice for edit forms
        await this.firstNameInput.clear();
        await this.fillInput(this.firstNameInput, firstName);
        
        await this.lastNameInput.clear();
        await this.fillInput(this.lastNameInput, lastName);
        
        await this.clickElement(this.saveChangesButton);
        await this.waitForPageLoad();
    }

    /**
     * Retrieves the success alert message after updating the profile.
     */
    async getUpdateSuccessMessage(): Promise<string> {
        return await this.getText(this.successAlertMessage);
    }
}