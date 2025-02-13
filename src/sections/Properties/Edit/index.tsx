import { useGetProperty } from "@/hooks/property";
import Form from "./Form";
import { useEditPropertyMutation } from "@/services/properties";
import { useCallback } from "react";

const EditById = () => {
    const { property } = useGetProperty();

    const [edit, { isSuccess }] = useEditPropertyMutation();

    const handleSubmit = useCallback(() => {}, []);

    return (
        <Form
            property={property}
            onSubmit={handleSubmit}
            isSuccess={isSuccess}
        />
    );
};

export default EditById;
