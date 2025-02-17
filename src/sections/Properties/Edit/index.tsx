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
            const editPromise = edit({ id, body });
            const generatePromise = generatePDF(id);

            const promises: any = [editPromise];
            if (generate) promises.push(generatePromise);

            await Promise.all(promises);
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
