import { test, expect } from '../../../src/fixtures/page-fixtures';
import { generateUserData } from '../../../src/utils/data-generator';

test.describe('Purchase Flow - End to End', () => {
    // Generate fresh billing data for the checkout process
    const billingData = generateUserData();

    test('Should successfully complete a product purchase', async ({ homePage, productPage, cartPage, checkoutPage }) => {
        
        await test.step('Navigate to the home page and go to the Shoes (Zapatos) module', async () => {
            await homePage.goto();
            await homePage.header.navigateToShoes();
            
            // For architecture purposes, let's assume navigating to shoes and clicking the first product.
            await homePage.openFirstProduct();
        });

        await test.step('Select size and add product to the cart', async () => {
            await productPage.selectFirstAvailableSize();
            await productPage.addToCart();
            await productPage.proceedToViewCart();
        });

        await test.step('Review cart and proceed to checkout', async () => {
            // Assert that there's a valid amount in the cart before proceeding
            const total = await cartPage.getCartTotal();
            expect(total).not.toBeNull();
            
            await cartPage.proceedToCheckout();
        });

        await test.step('Fill billing details and place the order', async () => {
            await checkoutPage.fillBillingDetails(billingData);
            await checkoutPage.placeOrder();
            
            // Assert that the order was received successfully
            const confirmationMessage = await checkoutPage.getOrderConfirmationTitle();
            // The text matches standard WooCommerce/e-commerce success messages
            expect(confirmationMessage).toMatch(/Pedido recibido|Order received/i); 
        });

    });
});