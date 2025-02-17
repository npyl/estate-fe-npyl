import { useGetProperty } from "@/hooks/property";
import useToggle from "@/hooks/useToggle";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { forwardRef, useImperativeHandle } from "react";
import { useTranslation } from "react-i18next";

interface GenerateCheckboxRef {
    getGenerate: () => boolean;
}

const GenerateCheckbox = forwardRef<GenerateCheckboxRef, object>((_, ref) => {
    const { t } = useTranslation();

    const { property } = useGetProperty();
    const { createdAt, updatedAt } = property || {};
    const isFirstEdit = createdAt === updatedAt;
    const [generate, toggleGenerate] = useToggle(isFirstEdit);

    useImperativeHandle(
        ref,
        () => ({
            getGenerate: () => generate,
        }),
        [generate]
    );

    // INFO: make sure we disable the checkbox on first Edit (which is equivalent to a Create)
    if (isFirstEdit) return null;

    return (
        <FormControlLabel
            label={t("_GENERATE_CHECKBOX_")}
            control={<Checkbox checked={generate} onClick={toggleGenerate} />}
        />
    );
});

export type { GenerateCheckboxRef };
export default GenerateCheckbox;
