import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { usePDFEditorContext } from "../../Editor/context";
import { IPropertyResultResponse } from "@/types/properties";
import { PreferredLanguageType } from "@/types/enums";
import { formatThousands } from "@/utils/formatNumber";

const useAutofill = (row: number, onAutofill: VoidFunction) => {
    const { reloadInputs } = usePDFEditorContext();
    const { watch, setValue } = useFormContext();

    const autofill = useCallback(
        (p: IPropertyResultResponse) => {
            const lang = watch("language") as PreferredLanguageType;

            setValue(`suggestedProperties.${row}`, {
                area: lang === "GREEK" ? p.regionGR : p.regionEN || "-",
                address: p.location.street || "-",
                type: p.parentCategory.value || "-",
                livingSpace: p.area || "-",
                price: p.price ? formatThousands(p.price) : "-",
                fee: "-",
            });

            // update form
            reloadInputs();

            onAutofill();
        },
        [row, reloadInputs]
    );

    return { autofill };
};

export default useAutofill;
