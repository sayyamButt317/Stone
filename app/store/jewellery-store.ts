import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';


type Stone = ["Yes", "No", "Yss Stone"]
interface JewelleryStore {
    jewelleryType: string;
    genderType: string;
    style: string,
    stone: string
    gemType: string;
    metalType: string;
    sizeType: string;
    additionalDetails: string;
    additionalStyle: string;
    imagePreview: string;

    setStyle: (type: string) => void;
    setGenderType: (type: string) => void;
    setJewelleryType: (type: string) => void;
    setStone: (type: string) => void;
    setGemType: (type: string) => void;
    setMetalType: (type: string) => void;
    setSizeType: (type: string) => void;
    setAdditionalDetails: (type: string) => void;
    setAdditionalStyle: (type: string) => void;
    setImagePreview: (type: string) => void;
}

const useJewelleryStore = create<JewelleryStore>()(
    devtools(
        persist(
            (set) => ({
                jewelleryType: '',
                style: '',
                genderType: '',
                stone: '',
                gemType: '',
                metalType: '',
                sizeType: '',
                additionalDetails: '',
                additionalStyle: '',
                imagePreview: '',

                setJewelleryType: (type: string) => set({ jewelleryType: type }),
                setStyle: (type: string) => set({ style: type }),
                setStone: (type: string) => set({ stone: type }),
                setGenderType: (type: string) => set({ genderType: type }),
                setGemType: (type: string) => set({ gemType: type }),
                setMetalType: (type: string) => set({ metalType: type }),
                setSizeType: (type: string) => set({ sizeType: type }),
                setAdditionalDetails: (type: string) => set({ additionalDetails: type }),
                setAdditionalStyle: (type: string) => set({ additionalStyle: type }),
                setImagePreview: (type: string) => set({ imagePreview: type }),
                clearJewellery: () => set({ jewelleryType: '', style: '', genderType: '', stone: '', gemType: '', metalType: '', sizeType: '', additionalDetails: '', additionalStyle: '', imagePreview: '' }),
            }),
            {
                name: 'jewellery-storage',
            },
        ),
    ));

export default useJewelleryStore;
