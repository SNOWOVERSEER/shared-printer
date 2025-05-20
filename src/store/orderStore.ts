import { create } from 'zustand';
import API from '@/api';
import orderService, { Order, OrderRequest, OrderResponseForCreate, OrdersResponse } from '@/api/services/orderService';

interface OrderState {
    myOrders: Order[];
    allOrders: Order[];
    currentOrder: Order | null;
    totalOrders: number;
    currentPage: number;
    pageSize: number;
    isLoading: boolean;
    error: string | null;
    createOrder: (orderData: OrderRequest) => Promise<OrderResponseForCreate>;
    fetchMyOrders: () => Promise<void>;
    fetchAllOrders: (page?: number, size?: number) => Promise<void>;
    fetchOrderById: (id: string) => Promise<Order>;
    updateOrderStatus: (id: string, status: string) => Promise<Order>;
    searchOrdersByPhone: (phone: string) => Promise<Order[]>;
    setCurrentOrder: (order: Order | null) => void;
    clearError: () => void;
}



const useOrderStore = create<OrderState>((set, get) => ({
    myOrders: [],
    allOrders: [],
    currentOrder: null,
    totalOrders: 0,
    currentPage: 1, // 后端从1开始计页
    pageSize: 10,
    isLoading: false,
    error: null,

    createOrder: async (orderData: OrderRequest) => {
        set({ isLoading: true, error: null });
        try {
            const orderRes = await API.order.createOrder(orderData);
            set({ isLoading: false });
            console.log('orderRes', orderRes);
            return orderRes;
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    fetchMyOrders: async () => {
        set({ isLoading: true, error: null });
        try {
            const orders = await API.order.getMyOrders();
            set({
                myOrders: orders,
                isLoading: false
            });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    fetchAllOrders: async (page = 1, size = 10) => {
        set({ isLoading: true, error: null });
        try {
            const response = await API.order.getAllOrders(page, size);
            set({
                allOrders: response.items,
                totalOrders: response.total,
                currentPage: page,
                pageSize: size,
                isLoading: false
            });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    fetchOrderById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const order = await API.order.getOrderById(id);
            set({ currentOrder: order, isLoading: false });
            return order;
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    searchOrdersByPhone: async (phone: string) => {
        set({ isLoading: true, error: null });
        try {
            const orders = await API.order.searchOrdersByPhone(phone);
            set({ myOrders: orders, isLoading: false });
            return orders;
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    updateOrderStatus: async (id: string, status: string) => {
        set({ isLoading: true, error: null });
        try {
            const updatedOrder = await API.order.updateOrderStatus(id, status);

            if (get().currentOrder?.id === id) {
                set({ currentOrder: updatedOrder });
            }


            const updatedMyOrders = get().myOrders.map(order =>
                order.id === id ? updatedOrder : order
            );

            const updatedAllOrders = get().allOrders.map(order =>
                order.id === id ? updatedOrder : order
            );

            set({
                myOrders: updatedMyOrders,
                allOrders: updatedAllOrders,
                isLoading: false
            });

            return updatedOrder;
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    setCurrentOrder: (order) => set({ currentOrder: order }),

    clearError: () => set({ error: null })
}));

export default useOrderStore;