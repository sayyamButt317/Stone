import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';


interface RingProps {
    summary: string;
    image_prompt: string;
    cautions: string;
    setSummary: (summary: string) => void;
    setImagePrompt: (image_prompt: string) => void;
    setCautions: (cautions: string) => void;
    clearRing: () => void;
}

const useRingStore = create<RingProps>()(
    devtools(
        persist(
            (set) => ({
                summary: '',
                image_prompt: '',
                cautions: '',
                clearRing: () => set({ summary: '', image_prompt: '', cautions: '' }),
                setSummary: (summary: string) => set({ summary }),
                setImagePrompt: (image_prompt: string) => set({ image_prompt }),
                setCautions: (cautions: string) => set({ cautions }),
            }),
            {
                name: 'Ringstore',
            },
        )));

export default useRingStore;
