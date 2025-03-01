import { useGetProperty } from "@/hooks/property";
import Form from "./Form";
import {
    useEditPropertyMutation,
    useGeneratePDFMutation,
} from "@/services/properties";
import { useCallback } from "react";
import { IPropertiesPOST } from "@/types/properties";
import { useRouter } from "next/router";

const EditById = () => {
    const router = useRouter();
    const { property, propertyId: id } = useGetProperty();

    const [edit] = useEditPropertyMutation();
    const [generatePDF] = useGeneratePDFMutation();

    const handleSubmit = useCallback(
        async (body: IPropertiesPOST, generate: boolean) => {
            // TODO: as improvement tell BE to incorporate this condition inside property-create.
            // Right now res0 triggers a revalidate and handleSubmit's await stops which means that the Submit button stops loading

            const res0 = await edit({ id, body });
            if ("error" in res0) return;

            if (generate) {
                const res1 = await generatePDF(id);
                if ("error" in res1) return;
            }
        },
        [id]
    );

    const onSubmitSuccess = useCallback(() => {
        router.push(`/property/${id}`);
    }, [id]);

    return (
        <Form
            property={property}
            onSubmit={handleSubmit}
            onSubmitSuccess={onSubmitSuccess}
        />
    );
};

export default EditById;
