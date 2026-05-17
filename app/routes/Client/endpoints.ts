export const CompanyENDPOINT = {
    GENERATE_RING_DESIGN: `/ring-selection`,
    GENERATE_IMAGE: `/generate-image`,
    UPLOAD_INSPIRATION_IMAGE: `/upload-image`,

    Users: {
        GET_ALL: `/users/all`,
        GET_BY_ID: (customer_id: string) => `/users/get?customer_id=${customer_id}`,
    },

    Designs: {
        GET_ALL_CUSTOMER_DESIGNS: (customer_id: string) => `/designs/customer/${customer_id}`,
        DELETE_ALL_CUSTOMER_DESIGN: (customer_id: string) => `/designs/customer/${customer_id}`,
        GET_CUSTOMER_DESIGN_BY_ID: (design_id: string) => `/designs/${design_id}`,
        DELETE_DESIGN_BY_ID: (design_id: string) => `/designs/${design_id}`,
    },
};

