import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Header } from '../components/Header';

export class HomePage extends BasePage {
    public readonly header: Header;

    constructor(page: Page) {
        super(page);
        // We compose the HomePage with the Header component
        this.header = new Header(page);
    }

    /**
     * Navigates to the base URL of the application.
     */
    async goto(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
        await this.page.waitForLoadState('networkidle').catch(() => undefined);
    }

    /**
     * Opens the first product from the product grid on the homepage.
     */
    async openFirstProduct(): Promise<void> {
        await this.page.locator('.bg-bb-product-gray > .relative').first().click();
        await this.waitForPageLoad();
    }
}