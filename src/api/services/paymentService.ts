import { post } from '../axios';

export interface PaymentVerificationResponse {
    order_id: string;
    payment_status: string;
    is_paid: boolean;
    session_id: string;
}

export interface CheckoutSessionResponse {
    session_id: string;
    url: string;
}

const paymentService = {

    createCheckoutSession: (orderId: string): Promise<CheckoutSessionResponse> => {
        return post<CheckoutSessionResponse>(`/api/stripe/create-checkout-session/${orderId}`);
    },


    verifyPayment: (sessionId: string, orderId: string): Promise<PaymentVerificationResponse> => {
        return post<PaymentVerificationResponse>(`/api/stripe/verify-payment?session_id=${sessionId}&order_id=${orderId}`);
    }
};

export default paymentService;