import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from '../components/Header';

export class ProductPage extends BasePage {
    public readonly header: Header;

    // Locators
    private readonly sizeSelector: Locator;
    private readonly addToCartButton: Locator;
    private readonly successCartMessage: Locator;
    private readonly viewCartLink: Locator;

    constructor(page: Page) {
        super(page);
        this.header = new Header(page);

        this.sizeSelector = page.locator('button').filter({ hasText: /^(34|35|36|37|38|39|40)$/ }).first();
        this.addToCartButton = page.getByRole('button', { name: /Añadir al carrito|Agregar al carrito/i });
        this.successCartMessage = page
            .locator('.woocommerce-message')
            .filter({ hasText: /añadido|agregado|added|se ha agregado/i })
            .first();
        this.viewCartLink = page.locator('a[href*="/carrito/"], a:has-text("Ver carrito"):visible').first();
    }

    /**
     * Selects the first available size for the product.
     */
    async selectFirstAvailableSize(): Promise<void> {
        const availableSize = this.sizeSelector;
        if (await availableSize.count()) {
            await this.clickElement(availableSize);
        }
    }

    /**
     * Adds the selected product to the cart.
     */
    async addToCart(): Promise<void> {
        await this.clickElement(this.addToCartButton);
        await this.waitForPageLoad();
    }

    /**
     * Verifies the success message and navigates to the cart.
     */
    async proceedToViewCart(): Promise<void> {
        await this.successCartMessage.waitFor({ state: 'visible' });
        await this.viewCartLink.waitFor({ state: 'visible' });
        await this.clickElement(this.viewCartLink);
        await this.waitForPageLoad();
    }
}