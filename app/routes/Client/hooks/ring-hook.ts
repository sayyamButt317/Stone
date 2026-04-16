import { useMutation } from "@tanstack/react-query"
import { RING_CREATION_INSTRUCATIONS_PAYLOAD } from "@/app/constant/ringcreation"
import { GenerateRingDesignInstructions } from "../routes"
import useRingStore from "@/app/store/ring-store"
import { useRouter } from "next/navigation"
import { FLOW_ROUTES } from "@/app/Client/flow-routes"

export function useCreateRingMutation() {
    const setImagePrompt = useRingStore((s) => s.setImagePrompt)
    const router = useRouter()
    return useMutation({
        mutationFn: (payload: RING_CREATION_INSTRUCATIONS_PAYLOAD) => GenerateRingDesignInstructions(payload),
        onSuccess: (data) => {
            setImagePrompt(data.image_prompt)
            router.push(FLOW_ROUTES.additionalDetails)
        },
        onError: (error) => {
            console.log(error)
        },
    })
}