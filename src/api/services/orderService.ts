import { get, post, put } from '../axios';

export interface OrderRequest {
    email: string;
    name: string;
    phone: string;
    file_name: string;
    file_id: string;
    pages: number;
    copies: number;
    color_mode: string;
    sides: string;
    paper_size: string;
    orientation: string;
    pages_per_side: number;
    amount: number;
    delivery_method: string;
    building?: string;
    mailbox_number?: string;
    notes?: string;
}

export interface Order {
    id: string;
    order_search_id: string;
    file_name: string;
    status: string;
    created_at: string;
    updated_at: string;
    completed_at?: string;
    [key: string]: any;
}

export interface OrdersResponse {
    content: Order[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

export interface OrderList {
    items: Order[];
    total: number;
}

export interface OrderResponseForCreate {
    order_search_id: string;
    username: string;
    file_id: string;
    status: string;
    is_guest: boolean;
    created_at: string;
}

export interface StripePaymentResponse {
    order_id: string;
    payment_status: string;
    is_paid: boolean;
    session_id: string;
}

const orderService = {
    createOrder: (data: OrderRequest): Promise<OrderResponseForCreate> => {
        return post<OrderResponseForCreate>('/api/orders', data);
    },

    getMyOrders: (): Promise<Order[]> => {
        return get<Order[]>('/api/orders/my');
    },
    getAllOrders: (page: number = 1, size: number = 10): Promise<OrderList> => {
        return get<OrderList>(`/api/orders?page=${page}&size=${size}`);
    },

    updateOrderStatus: (id: string, status: string): Promise<Order> => {
        return put<Order>(`/api/orders/${id}/status?status=${status}`, {});
    },

    getOrderById: (id: string): Promise<Order> => {
        return get<Order>(`/api/orders/${id}`);
    },

    searchOrdersByPhone: (phone: string): Promise<Order[]> => {
        return get<Order[]>(`/api/orders/search/phone/${phone}`);
    },
};

export default orderService;