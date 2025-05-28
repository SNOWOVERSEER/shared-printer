import { get, post } from '../axios';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
    fullName?: string;
    phone?: string;
    building?: string;
    mailboxNumber?: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    id: number;
    username: string;
    email: string;
    role: string;
}

export interface PasswordResetRequest {
    current_password: string;
    new_password: string;
}

const authService = {
    login: (data: LoginRequest): Promise<LoginResponse> => {
        const formData = new URLSearchParams();
        formData.append('username', data.username);
        formData.append('password', data.password);

        return post<LoginResponse>('/api/auth/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true,
        });
    },

    register: (data: RegisterRequest): Promise<string> => {
        return post<string>('/api/auth/register', data);
    },

    resetPassword: (data: PasswordResetRequest): Promise<string> => {
        return post<string>('/api/auth/reset-password', data);
    }

};

export default authService;