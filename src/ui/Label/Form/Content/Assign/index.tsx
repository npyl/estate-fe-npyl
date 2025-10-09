import { useWatch } from "react-hook-form";
import { ILabelForm } from "../../types";
import useToggle from "@/hooks/useToggle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { LabelResourceType } from "@/types/label";
import RHFPropertyAutocomplete from "./RHFPropertyAutocomplete";
import RHFCustomerAutocomplete from "./RHFCustomerAutocomplete";

interface PickerProps {
    resource: LabelResourceType;
}

const Picker: FC<PickerProps> = ({ resource }) => {
    if (resource === "property") return <RHFPropertyAutocomplete />;
    if (resource === "customer") return <RHFCustomerAutocomplete />;
    return null;
};

const Assign = () => {
    const { t } = useTranslation();

    const [isChecked, toggleChecked] = useToggle();

    const resource = useWatch<ILabelForm>({
        name: "resource",
    }) as LabelResourceType;

    if (resource === "document" || resource === "ticket") return null;

    return (
        <>
            <FormControlLabel
                control={
                    <Checkbox checked={isChecked} onClick={toggleChecked} />
                }
                label={t("Label assignment")}
                sx={{
                    color: "text.secondary",
                }}
            />

            {isChecked ? <Picker resource={resource} /> : null}
        </>
    );
};

export default Assign;
