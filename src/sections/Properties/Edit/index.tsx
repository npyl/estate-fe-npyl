import { useGetProperty } from "@/hooks/property";
import Form from "./Form";

const EditById = () => {
    const { property } = useGetProperty();
    return <Form property={property} />;
};

export default EditById;
