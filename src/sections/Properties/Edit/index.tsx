import { useGetProperty } from "@/hooks/property";
import Form from "./Form";
import { useEditPropertyMutation } from "@/services/properties";
import { useCallback } from "react";
import { IPropertiesPOST } from "@/types/properties";

const EditById = () => {
    const { property, propertyId: id } = useGetProperty();

    const [edit, { isSuccess }] = useEditPropertyMutation();

    const handleSubmit = useCallback(
        async (body: IPropertiesPOST, generate: boolean) => {
            const res = await edit({ id, body });
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
