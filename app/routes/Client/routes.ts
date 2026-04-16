import axios from 'axios';
import { CompanyENDPOINT } from './endpoints';
import { RING_CREATION_INSTRUCATIONS_PAYLOAD, RING_GENERATION_PAYLOAD } from '@/app/constant/ringcreation';


const api = axios.create({
    baseURL: 'https://shopify-backend-sh3v.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});


export const GenerateRingDesignInstructions = async (payload: RING_CREATION_INSTRUCATIONS_PAYLOAD) => {
    const response = await api.post(CompanyENDPOINT.GENERATE_RING_DESIGN, payload);
    return response.data;
};

export const GenerateImage = async (payload: RING_GENERATION_PAYLOAD) => {
    const formData = new FormData();
    formData.append('prompt', payload.prompt);
    if (payload.image) {
        formData.append('image', payload.image);
    }

    const response = await api.post(CompanyENDPOINT.GENERATE_IMAGE, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};