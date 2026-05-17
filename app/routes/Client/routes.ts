import axios from 'axios';
import { CompanyENDPOINT } from './endpoints';
import { RING_CREATION_INSTRUCATIONS_PAYLOAD, RING_GENERATION_PAYLOAD } from '@/app/constant/ringcreation';


const api = axios.create({
    baseURL: "http://54.167.236.90/api",
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

export const UploadInspirationImage = async (payload: File) => {
    const formData = new FormData();
    formData.append('image', payload);
    const response = await api.post(CompanyENDPOINT.UPLOAD_INSPIRATION_IMAGE, formData);
    return response.data;
};

export const GetAllUsers = async () => {
    const response = await api.get(CompanyENDPOINT.Users.GET_ALL);
    return response.data;
};

export const GetUserById = async (customer_id: string) => {
    const response = await api.get(CompanyENDPOINT.Users.GET_BY_ID(customer_id));
    return response.data;
};

export const GetAllCustomerDesigns = async (customer_id: string) => {
    const response = await api.get(CompanyENDPOINT.Designs.GET_ALL_CUSTOMER_DESIGNS(customer_id));
    return response.data;
};

export const GetCustomerDesignById = async (design_id: string) => {
    const response = await api.get(CompanyENDPOINT.Designs.GET_CUSTOMER_DESIGN_BY_ID(design_id));
    return response.data;
};

export const DeleteAllCustomerDesigns = async (customer_id: string) => {
    const response = await api.delete(CompanyENDPOINT.Designs.DELETE_ALL_CUSTOMER_DESIGN(customer_id));
    return response.data;
};

export const DeleteDesignById = async (id: string) => {
    const response = await api.delete(CompanyENDPOINT.Designs.DELETE_DESIGN_BY_ID(id));
    return response.data;
};