import axios from 'axios';
import { CompanyENDPOINT } from './endpoints';
import { toast } from 'sonner';
import { getAuthTokenProvider } from '@/app/provider/auth-provide';
import useAuthStore from '@/app/store/auth-store';


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const accessToken = getAuthTokenProvider();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            useAuthStore().clearAuth();

            if (error.response?.status === 403) {
                toast.error('Unauthorized access');
            } else if (error.response?.status === 500) {
                toast.error('Server error');
            } else {
                toast.error('An error occurred. Please try again.');
                window.location.href = '/auth/login';
            }
        }
        return Promise.reject(error);
    },
);

export const GenerateRingDesign = async (payload: {
    user_input: string;
}) => {
    const response = await api.post(CompanyENDPOINT.GENERATE_RING_DESIGN, payload);
    return response.data;
};
