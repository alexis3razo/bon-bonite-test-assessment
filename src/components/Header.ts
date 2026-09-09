import { Page, Locator } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class Header extends BasePage {

    // Navigation Menus
    private readonly shoesMenu: Locator;
    private readonly bagsMenu: Locator;
    private readonly beltsMenu: Locator;
    private readonly accessoriesMenu: Locator;
    private readonly outletMenu: Locator;
    
    // User & Utility Icons
    private readonly accountIcon: Locator;
    private readonly cartIcon: Locator;

    constructor(page: Page) {
        super(page);

        this.shoesMenu = page.locator('a[href*="/categoria-producto/zapatos-mujer/"], a:has-text("Zapatos")').first();
        this.bagsMenu = page.locator('a[href*="/categoria-producto/bolsos-mujer/"], a:has-text("Bolsos")').first();
        this.beltsMenu = page.locator('a[href*="/categoria-producto/cinturones-mujer/"], a:has-text("Cinturones")').first();
        this.accessoriesMenu = page.locator('a[href*="/categoria-producto/accesorios-mujer/"], a:has-text("Accesorios")').first();
        this.outletMenu = page.locator('a[href*="/categoria-producto/outlet/"], a:has-text("Outlet")').first();

        this.accountIcon = page.locator('a[href*="/mi-cuenta"], a:has-text("Mi cuenta")').first();
        this.cartIcon = page.locator('a[href*="/carrito/"], a:has-text("Carrito"), [class*="cart-contents"]').first();
    }

    // --- Navigation Methods ---

    async navigateToShoes(): Promise<void> {
        await this.clickElement(this.shoesMenu);
        await this.waitForPageLoad();
    }

    async navigateToBags(): Promise<void> {
        await this.clickElement(this.bagsMenu);
        await this.waitForPageLoad();
    }

    async navigateToBelts(): Promise<void> {
        await this.clickElement(this.beltsMenu);
        await this.waitForPageLoad();
    }

    async navigateToAccessories(): Promise<void> {
        await this.clickElement(this.accessoriesMenu);
        await this.waitForPageLoad();
    }

    async navigateToOutlet(): Promise<void> {
        await this.clickElement(this.outletMenu);
        await this.waitForPageLoad();
    }

    async clickMyAccount(): Promise<void> {
        await this.clickElement(this.accountIcon);
        await this.waitForPageLoad();
    }
    
    async clickCart(): Promise<void> {
        await this.clickElement(this.cartIcon);
        await this.waitForPageLoad();
    }
}