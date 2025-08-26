import Form from "./Form";
import { useEditPropertyMutation } from "@/services/properties";
import { useCallback } from "react";
import { IPropertiesPOST } from "@/types/properties";
import { useRouter } from "next/router";
import useGetProperty from "@/sections/Properties/hooks/useGetProperty";

const EditById = () => {
    const router = useRouter();
    const { property, propertyId: id } = useGetProperty();

    const [edit] = useEditPropertyMutation();

    const handleSubmit = useCallback(
        async (body: IPropertiesPOST, generate: boolean) => {
            const res = await edit({ id, generate, ...body });

            if ("error" in res) return false;

            return true;
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
