import { create } from 'zustand';
import API from '@/api';
import { FileResponse } from '@/api/services/fileService';

interface FileState {
    uploadedFile: FileResponse | null;
    isUploading: boolean;
    error: string | null;
    uploadFile: (file: File) => Promise<FileResponse>;
    clearUploadedFile: () => void;
    clearError: () => void;
}

const useFileStore = create<FileState>((set, get) => ({
    uploadedFile: null,
    isUploading: false,
    error: null,

    uploadFile: async (file: File) => {
        set({ isUploading: true, error: null });
        try {
            const response = await API.file.uploadFile(file);
            set({ uploadedFile: response, isUploading: false });
            return response;
        } catch (error: any) {
            set({ error: error.message, isUploading: false });
            throw error;
        }
    },

    clearUploadedFile: () => set({ uploadedFile: null }),

    clearError: () => set({ error: null })
}));

export default useFileStore;