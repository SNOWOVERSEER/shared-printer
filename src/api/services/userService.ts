import { get, put } from '../axios';

export interface User {
    id: number;
    username: string;
    email: string;
    full_name?: string;
    phone?: string;
    building?: string;
    mailbox_number?: string;
    created_at: string;
    updated_at: string;
    role?: string;
}

export interface UpdateUserRequest {
    full_name?: string;
    phone?: string;
    building?: string;
    mailbox_number?: string;
}

const userService = {
    getUserInfo: (): Promise<User> => {
        return get<User>('/api/user/me');
    },

    updateUserInfo: (data: UpdateUserRequest): Promise<User> => {
        return put<User>('/api/user/me', data);
    }
};

export default userService;