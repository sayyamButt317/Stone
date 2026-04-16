

export interface RING_CREATION_INSTRUCATIONS_PAYLOAD {
    jewelleryType: string;
    genderType: string;
    style: string;
    ringStyleFamily: string;
    metalType: string;
    sizeType: string;
    stone: string;
    gemType: string;
    stonecolor: string;
    prefersetting: string;
    pick: string;
    wearFrequency: string;
    inspirationKeywords: string[];

    chosenColor: string;
    imagePreview: string;
    yssReference: string;

    ownStone: {
        stone_type: string;
        shape: string;
        color: string;
        approximate_size: string;
    }
}

export interface RING_GENERATION_PAYLOAD {
    prompt: string;
    image?: File;
}