import { create } from 'zustand';
import API from '@/api';
import { UpdateUserRequest, User } from '@/api/services/userService';
import orderService from '@/api/services/orderService';

interface UserState {
    userProfile: User | null;
    isLoading: boolean;
    error: string | null;
    fetchUserProfile: () => Promise<User>;
    updateUserProfile: (data: UpdateUserRequest) => Promise<User>;
    clearError: () => void;
}

const useUserStore = create<UserState>((set) => ({
    userProfile: null,
    isLoading: false,
    error: null,

    fetchUserProfile: async () => {
        set({ isLoading: true, error: null });
        try {
            const user = await API.user.getUserInfo();
            set({ userProfile: user, isLoading: false });
            return user;
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    updateUserProfile: async (data: UpdateUserRequest) => {
        set({ isLoading: true, error: null });
        try {
            const updatedUser = await API.user.updateUserInfo(data);
            set({ userProfile: updatedUser, isLoading: false });
            return updatedUser;
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            throw error;
        }
    },

    clearError: () => set({ error: null })
}));

export default useUserStore;