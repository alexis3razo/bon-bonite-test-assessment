import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Waits for the network to be idle, ensuring the page is fully loaded.
     */
    protected async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Clicks on an element after ensuring it is visible and enabled.
     */
    protected async clickElement(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    /**
     * Fills an input field with the provided text.
     */
    protected async fillInput(locator: Locator, text: string): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.fill(text);
    }

    /**
     * Retrieves the inner text of a given element.
     */
    protected async getText(locator: Locator): Promise<string> {
        await locator.waitFor({ state: 'visible' });
        return (await locator.innerText()).trim();
    }
}