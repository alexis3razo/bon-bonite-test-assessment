import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    // Billing Details Locators
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly addressInput: Locator;
    private readonly cityInput: Locator;
    private readonly phoneInput: Locator;
    private readonly emailInput: Locator;
    
    // Order and Payment Locators
    private readonly termsAndConditionsCheckbox: Locator;
    private readonly placeOrderButton: Locator;
    private readonly orderConfirmationMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.firstNameInput = page.locator('#billing_first_name, input[name="billing_first_name"]').first();
        this.lastNameInput = page.locator('#billing_last_name, input[name="billing_last_name"]').first();
        this.addressInput = page.locator('#billing_address_1, input[name="billing_address_1"]').first();
        this.cityInput = page.locator('#billing_city, input[name="billing_city"]').first();
        this.phoneInput = page.locator('#billing_phone, input[name="billing_phone"]').first();
        this.emailInput = page.locator('#billing_email, input[name="billing_email"]').first();

        this.termsAndConditionsCheckbox = page.locator('#terms, input[name*="terms"], label:has-text("Acepto") input').first();
        this.placeOrderButton = page.locator('button:has-text("Realizar el pedido"), button:has-text("Place order"), button:has-text("Realizar pedido")').first();

        this.orderConfirmationMessage = page.locator('h1, h2').filter({ hasText: /Pedido recibido|Order received/i }).first();
    }

    /**
     * Fills the billing information form using the generated user data.
     */
    async fillBillingDetails(userData: any): Promise<void> {
        // Only filling required fields for a standard flow
        await this.fillInput(this.firstNameInput, userData.firstName);
        await this.fillInput(this.lastNameInput, userData.lastName);
        await this.fillInput(this.addressInput, userData.address);
        await this.fillInput(this.cityInput, userData.city);
        await this.fillInput(this.phoneInput, userData.phone);
        await this.fillInput(this.emailInput, userData.email);
    }

    /**
     * Accepts the terms and conditions and places the order.
     */
    async placeOrder(): Promise<void> {
        // Sometimes standard click() fails on custom checkboxes, force: true might be needed depending on the DOM
        await this.termsAndConditionsCheckbox.click({ force: true }); 
        await this.clickElement(this.placeOrderButton);
        await this.waitForPageLoad();
    }

    /**
     * Verifies if the order was successfully placed.
     */
    async getOrderConfirmationTitle(): Promise<string> {
        return await this.getText(this.orderConfirmationMessage);
    }
}