import { get, uploadFile } from '../axios';

export interface FileResponse {
    fileId: string;
    filename: string;
    originalName: string;
    contentType: string;
    pages: number;
}

const fileService = {
    uploadFile: (file: File): Promise<FileResponse> => {
        return uploadFile<FileResponse>('/api/files/upload', file);
    },

    getFile: (filename: string): Promise<Blob> => {
        return get<Blob>(`/api/files/${filename}`, {}, {
            responseType: 'blob'
        });
    }
};

export default fileService;