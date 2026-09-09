import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from '../components/Header';

export class CartPage extends BasePage {
    public readonly header: Header;

    // Locators
    private readonly proceedToCheckoutButton: Locator;
    private readonly cartTotalAmount: Locator;

    constructor(page: Page) {
        super(page);
        this.header = new Header(page);

        this.proceedToCheckoutButton = page.getByRole('link', { name: 'Finalizar compra' });
        this.cartTotalAmount = page.locator('.order-total .amount').last();
    }

    /**
     * Clicks on the proceed to checkout button.
     */
    async proceedToCheckout(): Promise<void> {
        await this.clickElement(this.proceedToCheckoutButton);
        await this.waitForPageLoad();
    }

    /**
     * Retrieves the total amount of the cart to assert it's greater than 0.
     */
    async getCartTotal(): Promise<string> {
        return await this.getText(this.cartTotalAmount);
    }
}