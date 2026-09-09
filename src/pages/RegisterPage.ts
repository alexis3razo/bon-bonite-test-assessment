import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
    // Locators
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly registerButton: Locator;
    private readonly successWelcomeMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.emailInput = page.locator('input#reg_email, input[type="email"]').first();
        this.passwordInput = page.locator('input#reg_password, input[type="password"]').first();
        this.registerButton = page.locator('button:has-text("Registrarse"), button:has-text("Crear cuenta"), input[type="submit"]').first();

        this.successWelcomeMessage = page.locator('.woocommerce-MyAccount-content p, .woocommerce-message, .dashboard').first();
    }

    /**
     * Performs the user registration process.
     * 
     * @param email - The generated user email
     * @param password - The generated user password
     */
    async registerUser(email: string, password: string): Promise<void> {
        const registerLink = this.page.locator('a, button').filter({
            hasText: /Regístrate|Registrarse|Crear cuenta/i
        }).first();

        if (await registerLink.count()) {
            await this.clickElement(registerLink);
        }

        const emailField = this.page.locator(
            'input#reg_email, input#email, input[type="email"], input[name*="email"], input[id*="email"], input[autocomplete="email"]'
        ).first();
        const passwordField = this.page.locator(
            'input#reg_password, input#password, input[type="password"], input[name*="password"], input[autocomplete="current-password"]'
        ).first();

        await this.fillInput(emailField, email);
        await this.fillInput(passwordField, password);

        const submitButton = this.page.locator(
            'button:has-text("Registrarse"), button:has-text("Crear cuenta"), input[type="submit"], button:has-text("Crear usuario")'
        ).first();

        await this.clickElement(submitButton);
        await this.waitForPageLoad();
    }

    /**
     * Retrieves the welcome message to assert a successful registration.
     */
    async getWelcomeMessage(): Promise<string> {
        return await this.getText(this.successWelcomeMessage);
    }
}