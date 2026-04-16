import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type GenderChoice = 'female' | 'male' | 'unisex';
export type HaveStoneChoice = 'own' | 'choose' | 'reference';
export type OptionPick = "color" | "stone"
export type Preference =
    | "sharp_claw"
    | "rounded_claw"
    | "bezel"
    | "half_bezel"
    | "halo"
    | "hidden_halo";
export type OwnStoneFields = {
    stone_type: string
    color: string
    shape: string
    approximate_size: string
}

export type WearType = 'daily' | 'occasional' | 'special'

export type StoneType = 'Diamond' | 'Sapphire' | 'Emerald' | 'Ruby' | 'Morganite' | 'Other'
export type StoneShape = 'Round' | 'Oval' | 'Pear' | 'Emerald Cut' | 'Marquise' | 'Cushion' | 'Other'

const emptyOwnStone = (): OwnStoneFields => ({
    stone_type: 'Diamond',
    color: '',
    shape: 'Round',
    approximate_size: '',
})

export type Inspiration_Keywords =
    | "low_profile"
    | "vintage_feel"
    | "no_halo"
    | "dedicate_band"
    | "bold_look"
    | "minimal"
    | "statement"
    | "no_sharp_edges"

export type StoneColor = 'Black' | 'Blue' | 'Brown' | 'Clear' | 'Green' | 'MultiColor' | 'Orange' | 'Pink' | 'Purple' | 'Red' | 'Yellow' | 'Other'
interface JewelleryStore {
    jewelleryType: string;
    genderType: GenderChoice | '';
    style: string;
    ringStyleFamily: string;
    prefersetting: Preference | '';
    stone: HaveStoneChoice | ''
    stonecolor: StoneColor;
    pick: OptionPick | ''
    gemType: string;
    metalType: string;
    sizeType: string;
    additionalDetails: string;
    additionalStyle: string;
    imagePreview: string;
    ownStone: OwnStoneFields;
    yssReference: string;
    chosenColor: string;
    wearFrequency: string;
    personalPreferences: string | '';
    inspirationKeywords: Inspiration_Keywords[];

    setStyle: (type: string) => void;
    setRingStyleFamily: (type: string) => void;
    setPrefersetting: (id: Preference | '') => void;
    setGenderType: (type: GenderChoice) => void;
    setJewelleryType: (type: string) => void;
    setStone: (type: HaveStoneChoice | '') => void;
    setStoneColor: (type: StoneColor) => void;
    setPick: (type: OptionPick | '') => void;
    setGemType: (type: string) => void;
    setMetalType: (type: string) => void;
    setSizeType: (type: string) => void;
    setAdditionalDetails: (type: string) => void;
    setAdditionalStyle: (type: string) => void;
    setImagePreview: (type: string) => void;
    setOwnStone: (patch: Partial<OwnStoneFields>) => void;
    setYssReference: (value: string) => void;
    setChosenColor: (value: string) => void;
    setWearFrequency: (value: string) => void;
    setPersonalPreferences: (value: string) => void;
    setInspirationKeywords: (value: Inspiration_Keywords[]) => void;
    clearJewellery: () => void;
}

const useJewelleryStore = create<JewelleryStore>()(
    devtools(
        persist(
            (set) => ({
                jewelleryType: '',
                style: '',
                ringStyleFamily: '',
                prefersetting: '',
                genderType: '',
                stone: '',
                stonecolor: 'Clear',
                pick: '',
                gemType: '',
                metalType: '',
                sizeType: '',
                additionalDetails: '',
                additionalStyle: '',
                imagePreview: '',
                ownStone: emptyOwnStone(),
                yssReference: '',
                chosenColor: '',
                wearFrequency: '',
                personalPreferences: '',
                inspirationKeywords: [],

                setJewelleryType: (type: string) => set({ jewelleryType: type }),
                setStyle: (type: string) => set({ style: type }),
                setRingStyleFamily: (type: string) => set({ ringStyleFamily: type }),
                setPrefersetting: (type: Preference | '') => set({ prefersetting: type }),
                setStone: (type: HaveStoneChoice | '') => set({ stone: type }),
                setPick: (type: OptionPick | '') => set({ pick: type }),
                setGenderType: (type: GenderChoice) => set({ genderType: type }),
                setGemType: (type: string) => set({ gemType: type }),
                setMetalType: (type: string) => set({ metalType: type }),
                setSizeType: (type: string) => set({ sizeType: type }),
                setAdditionalDetails: (type: string) => set({ additionalDetails: type }),
                setAdditionalStyle: (type: string) => set({ additionalStyle: type }),
                setImagePreview: (type: string) => set({ imagePreview: type }),
                setOwnStone: (patch) =>
                    set((state) => ({
                        ownStone: { ...state.ownStone, ...patch },
                    })),
                setYssReference: (value: string) => set({ yssReference: value }),
                setChosenColor: (value: string) => set({ chosenColor: value }),
                setWearFrequency: (value: string) => set({ wearFrequency: value }),
                setPersonalPreferences: (value: string) => set({ personalPreferences: value }),
                setInspirationKeywords: (value: Inspiration_Keywords[]) => set({ inspirationKeywords: value }),
                setStoneColor: (type: StoneColor) => set({ stonecolor: type }),
                clearJewellery: () =>
                    set({
                        jewelleryType: '',
                        style: '',
                        ringStyleFamily: '',
                        prefersetting: '',
                        genderType: '',
                        stone: '',
                        pick: '',
                        gemType: '',
                        metalType: '',
                        stonecolor: 'Clear',
                        sizeType: '',
                        additionalDetails: '',
                        additionalStyle: '',
                        personalPreferences: '',
                        imagePreview: '',
                        ownStone: emptyOwnStone(),
                        yssReference: '',
                        chosenColor: '',
                        wearFrequency: '',
                    }),
            }),
            {
                name: 'jewellery-storage',
            },
        ),
    ));

export default useJewelleryStore;
