import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invitationSchema, type InvitationFormData } from "@/validators/schemas/invitation";

export const useSendInvitation = () => {
    const form = useForm<InvitationFormData>({
        resolver: zodResolver(invitationSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data: InvitationFormData) => {
        try {
            console.log("Invitación enviada a:", data.email);
            return true;
        } catch (error) {
            console.error("Error al enviar la invitación:", error);
            return false;
        }
    };

    return {
        form,
        onSubmit,
    };
}; 