import { useCallback } from "react";
import { useLazyGetPropertyByIdQuery } from "@/services/properties";
import { Controller, useFormContext } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import PropertySearch from "@/components/Search/PropertySearch";
import useAutofill from "./hook";

const RHFPropertySearch = () => {
    const { control, setValue } = useFormContext();

    const [getProperty] = useLazyGetPropertyByIdQuery();
    const { autofill } = useAutofill(setValue);

    const handlePropertySelect = useCallback(
        (id: number) => getProperty(id).unwrap().then(autofill),
        [autofill]
    );

    return (
        <Controller
            name="propertyId"
            control={control}
            render={({ fieldState: { error } }) => (
                <>
                    <PropertySearch onSelectProperty={handlePropertySelect} />

                    {!!error ? (
                        <FormHelperText error sx={{ px: 2 }}>
                            {error.message}
                        </FormHelperText>
                    ) : null}
                </>
            )}
        />
    );
};

export default RHFPropertySearch;
