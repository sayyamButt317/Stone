import { RING_GENERATION_PAYLOAD } from "@/app/constant/ringcreation";
import { GenerateImage } from "../routes";
import { useMutation } from "@tanstack/react-query";
import useImageStore from "@/app/store/image-store";
import { FLOW_ROUTES } from "@/app/Client/flow-routes";
import { useRouter } from "next/navigation";


export default function useGenerateImageHook() {
    const router = useRouter()
    const setImageUrl = useImageStore((s) => s.setImageUrl)
    return useMutation({
        mutationFn: (payload: RING_GENERATION_PAYLOAD) => GenerateImage(payload),
        onSuccess: (data) => {
            setImageUrl(data.image_url)
            router.push(FLOW_ROUTES.imagePreview)
        },
    })
}