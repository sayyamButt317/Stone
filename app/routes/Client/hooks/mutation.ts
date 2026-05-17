import { RING_GENERATION_PAYLOAD } from "@/app/constant/ringcreation";
import { GenerateImage } from "../routes";
import { useMutation } from "@tanstack/react-query";
import useImageStore from "@/app/store/image-store";


export default function useGenerateImageHook() {
    const setImageUrl = useImageStore((s) => s.setImageUrl)
    return useMutation({
        mutationFn: (payload: RING_GENERATION_PAYLOAD) => GenerateImage(payload),
        onSuccess: (data) => {
            setImageUrl(data.image_url)
        },
        onError: (error) => {
            console.error(error)
        },
    })
}