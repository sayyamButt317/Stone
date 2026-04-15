import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type GenderChoice = 'female' | 'male' | 'unisex';

/** Gem step: already have a stone, need help choosing, or YSS catalog reference */
export type HaveStoneChoice = 'own' | 'choose' | 'reference';

type OptionPick = "color" | "stone"
interface JewelleryStore {
    jewelleryType: string;
    genderType: GenderChoice | '';
    style: string,
    stone: HaveStoneChoice | ''
    pick: OptionPick | ''
    gemType: string;
    metalType: string;
    sizeType: string;
    additionalDetails: string;
    additionalStyle: string;
    imagePreview: string;

    setStyle: (type: string) => void;
    setGenderType: (type: GenderChoice) => void;
    setJewelleryType: (type: string) => void;
    setStone: (type: HaveStoneChoice | '') => void;
    setPick: (type: OptionPick) => void;
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
                pick: '',
                gemType: '',
                metalType: '',
                sizeType: '',
                additionalDetails: '',
                additionalStyle: '',
                imagePreview: '',

                setJewelleryType: (type: string) => set({ jewelleryType: type }),
                setStyle: (type: string) => set({ style: type }),
                setStone: (type: HaveStoneChoice | '') => set({ stone: type }),
                setPick: (type: OptionPick | '') => set({ pick: type }),
                setGenderType: (type: GenderChoice) => set({ genderType: type }),
                setGemType: (type: string) => set({ gemType: type }),
                setMetalType: (type: string) => set({ metalType: type }),
                setSizeType: (type: string) => set({ sizeType: type }),
                setAdditionalDetails: (type: string) => set({ additionalDetails: type }),
                setAdditionalStyle: (type: string) => set({ additionalStyle: type }),
                setImagePreview: (type: string) => set({ imagePreview: type }),
                clearJewellery: () =>
                    set({
                        jewelleryType: '',
                        style: '',
                        genderType: '',
                        stone: '',
                        pick: '',
                        gemType: '',
                        metalType: '',
                        sizeType: '',
                        additionalDetails: '',
                        additionalStyle: '',
                        imagePreview: '',
                    }),
            }),
            {
                name: 'jewellery-storage',
            },
        ),
    ));

export default useJewelleryStore;
