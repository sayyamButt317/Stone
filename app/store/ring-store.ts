import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';


interface RingProps {
    jewelleryType: string;
    genderType: string;
    ringstyle: string,

    setJewelleryType: (type: string) => void;
    setGenderType: (type: string) => void;
    setRingStyle: (type: string) => void;
    gemType: string;
    setGemType: (type: string) => void;
    metalType: string;
    setMetalType: (type: string) => void;
    sizeType: string;
    setSizeType: (type: string) => void;
    additionalDetails: string;
    setAdditionalDetails: (type: string) => void;
    additionalStyle: string;
    setAdditionalStyle: (type: string) => void;
    imagePreview: string;
    setImagePreview: (type: string) => void;
}

const useRingStore = create<RingProps>()(
    devtools(
        persist(
            (set) => ({
                jewelleryType: '',
                genderType: '',
                ringstyle: '',
                gemType: '',
                metalType: '',
                sizeType: '',
                additionalDetails: '',
                additionalStyle: '',
                imagePreview: '',

                setJewelleryType: (type: string) => set({ jewelleryType: type }),
                setRingStyle: (type: string) => set({ ringstyle: type }),
                setGenderType: (type: string) => set({ genderType: type }),
                setGemType: (type: string) => set({ gemType: type }),
                setMetalType: (type: string) => set({ metalType: type }),
                setSizeType: (type: string) => set({ sizeType: type }),
                setAdditionalDetails: (type: string) => set({ additionalDetails: type }),
                setAdditionalStyle: (type: string) => set({ additionalStyle: type }),
                setImagePreview: (type: string) => set({ imagePreview: type }),
            }),
            {
                name: 'Ringstore',
            },
        ),
    ));

export default useRingStore;
