import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import API from '@/api';
import authService, { LoginRequest, LoginResponse } from '@/api/services/authService';



interface AuthState {
    user: LoginResponse | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginRequest) => Promise<LoginResponse>;
    logout: () => void;
    clearError: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (credentials: LoginRequest) => {
                set({ isLoading: true, error: null });
                try {
                    const user = await authService.login(credentials);
                    set({ user, isAuthenticated: true, isLoading: false });
                    return user;
                } catch (error: any) {
                    set({ error: error.message, isLoading: false });
                    throw error;
                }
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
            },

            clearError: () => set({ error: null })
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
);


export default useAuthStore;