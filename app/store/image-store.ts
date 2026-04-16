import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';


interface ImageProps {
    image_url: string;
    setImageUrl: (image_url: string) => void;
    clearImage: () => void;
}

const useImageStore = create<ImageProps>()(
    devtools(
        persist(
            (set) => ({
                image_url: '',
                setImageUrl: (image_url: string) => set({ image_url }),
                clearImage: () => set({ image_url: '' }),
            }),
            {
                name: 'ImageStore',
            },
        )));

export default useImageStore;
