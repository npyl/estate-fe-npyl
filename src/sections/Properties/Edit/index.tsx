import { useGetProperty } from "@/hooks/property";
import Form from "./Form";
import {
    useEditPropertyMutation,
    useGeneratePDFMutation,
} from "@/services/properties";
import { useCallback } from "react";
import { IPropertiesPOST } from "@/types/properties";

const EditById = () => {
    const { property, propertyId: id } = useGetProperty();

    const [edit, { isSuccess }] = useEditPropertyMutation();
    const [generatePDF] = useGeneratePDFMutation();

    const handleSubmit = useCallback(
        async (body: IPropertiesPOST, generate: boolean) => {
            // TODO: as improvement tell BE to incorporate this condition inside property-create.

            const res0 = await edit({ id, body });
            if ("error" in res0) return;

            if (generate) {
                await generatePDF(id);
            }
        },
        []
    );

    return (
        <Form
            property={property}
            onSubmit={handleSubmit}
            isSuccess={isSuccess}
        />
    );
};

export default EditById;
