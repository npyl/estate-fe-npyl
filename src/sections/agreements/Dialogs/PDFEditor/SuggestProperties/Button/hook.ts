import { useLazyGetPropertyByIdQuery } from "@/services/properties";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { usePDFEditorContext } from "../../Editor/context";

const useAutofill = (row: number) => {
    const { reloadInputs } = usePDFEditorContext();
    const { setValue } = useFormContext();

    const [getProperty, { isLoading }] = useLazyGetPropertyByIdQuery();

    const autofill = useCallback(
        (id: number) =>
            getProperty(id)
                .unwrap()
                .then((p) => {
                    setValue(`suggestedProperties.${row}`, {
                        area: p.location.region,
                        address: p.location.street,
                        type: p.parentCategory.value,
                        livingSpace: p.area,
                        fee: p.price,
                    });

                    // update form
                    reloadInputs();
                }),
        [row]
    );

    return { isLoading, autofill };
};

export default useAutofill;
