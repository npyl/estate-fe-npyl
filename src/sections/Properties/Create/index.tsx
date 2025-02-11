import { useCreatePropertyMutation } from "src/services/properties";
import { useRouter } from "next/router";
import Form from "./Form";

const PropertyCreate = () => {
    const router = useRouter();

    const [create, { isError, isLoading }] = useCreatePropertyMutation();

    const handleUpload = (parentCategory: string, category: string) =>
        category &&
        parentCategory &&
        // perform POST
        create({ parentCategory, category }).then(
            (res) => "data" in res && router.push(`/property/edit/${res.data}`)
        );

    return (
        <Form
            isLoading={isLoading}
            isError={isError}
            performCreate={handleUpload}
        />
    );
};

export default PropertyCreate;
