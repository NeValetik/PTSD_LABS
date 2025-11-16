"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIFacade = void 0;
/**
 * Facade Pattern
 * Provides a simplified interface to a complex subsystem of APIs
 */
class APIFacade {
    constructor(userAPI, productAPI, orderAPI) {
        this.userAPI = userAPI;
        this.productAPI = productAPI;
        this.orderAPI = orderAPI;
    }
    /**
     * Simplified method to get user profile
     */
    async getUserProfile(userId) {
        console.log('[FACADE] Getting user profile...');
        return this.userAPI.call(`/users/${userId}`, 'GET');
    }
    /**
     * Simplified method to get product details
     */
    async getProductDetails(productId) {
        console.log('[FACADE] Getting product details...');
        return this.productAPI.call(`/products/${productId}`, 'GET');
    }
    /**
     * Simplified method to create an order
     */
    async createOrder(userId, productId, quantity) {
        console.log('[FACADE] Creating order...');
        // Facade handles the complexity of coordinating multiple API calls
        const user = await this.getUserProfile(userId);
        const product = await this.getProductDetails(productId);
        const orderData = {
            userId: userId,
            productId: productId,
            quantity: quantity,
            userInfo: user.data,
            productInfo: product.data
        };
        return this.orderAPI.call('/orders', 'POST', orderData);
    }
    /**
     * Simplified method to get order history for a user
     */
    async getOrderHistory(userId) {
        console.log('[FACADE] Getting order history...');
        return this.orderAPI.call(`/orders/user/${userId}`, 'GET');
    }
    /**
     * Simplified method to get complete order details including user and product info
     */
    async getCompleteOrderDetails(orderId) {
        console.log('[FACADE] Getting complete order details...');
        const order = await this.orderAPI.call(`/orders/${orderId}`, 'GET');
        if (order.data && order.data.userId && order.data.productId) {
            const [user, product] = await Promise.all([
                this.getUserProfile(order.data.userId),
                this.getProductDetails(order.data.productId)
            ]);
            return {
                order: order.data,
                user: user.data,
                product: product.data
            };
        }
        return order;
    }
}
exports.APIFacade = APIFacade;
