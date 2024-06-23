import { useCallback } from "react";
import Search from "./Search";
import { useLazyGetPropertyByIdQuery } from "@/services/properties";
import { RHFTextField } from "@/components/hook-form";
import { useFormContext } from "react-hook-form";

const PropertyDetails = () => {
    const { setValue } = useFormContext();

    const [getProperty, { data }] = useLazyGetPropertyByIdQuery();

    const handlePropertySelect = useCallback(
        (id: number) =>
            getProperty(id)
                .unwrap()
                .then((p) => {
                    setValue("title", p.descriptions["en"].title);
                }),
        []
    );

    return (
        <>
            <Search onSelectProperty={handlePropertySelect} />

            <RHFTextField name="title" />
        </>
    );
};

export default PropertyDetails;
