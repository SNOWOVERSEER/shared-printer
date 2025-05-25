import { create } from 'zustand';
import API from '@/api';
import { CheckoutSessionResponse, PaymentVerificationResponse } from '@/api/services/paymentService';

interface PaymentState {
    sessionId: string | null;
    paymentUrl: string | null;
    isVerified: boolean;
    isLoading: boolean;
    error: string | null;
    createCheckoutSession: (orderId: string) => Promise<string>;
    verifyPayment: (sessionId: string, orderId: string) => Promise<boolean>;
    clearPaymentData: () => void;
    clearError: () => void;
}

const usePaymentStore = create<PaymentState>((set) => ({
    sessionId: null,
    paymentUrl: null,
    isVerified: false,
    isLoading: false,
    error: null,

    createCheckoutSession: async (orderId: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await API.payment.createCheckoutSession(orderId);
            set({
                sessionId: response.session_id,
                paymentUrl: response.url,
                isLoading: false
            });
            return response.url;
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    verifyPayment: async (sessionId: string, orderId: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await API.payment.verifyPayment(sessionId, orderId);
            const isVerified = response.is_paid;
            set({ isVerified, isLoading: false });
            return isVerified;
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    clearPaymentData: () => set({
        sessionId: null,
        paymentUrl: null,
        isVerified: false
    }),

    clearError: () => set({ error: null })
}));

export default usePaymentStore;