import { Checkbox, FormControlLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import { ILabelForm } from "../types";
import { useState } from "react";
const RHFPropertyAutocomplete = dynamic(() => import("./Property"));
const RHFCustomerAutocomplete = dynamic(() => import("./Customer"));

const Assign = () => {
    const { t } = useTranslation();

    const { watch, setValue } = useFormContext<ILabelForm>();

    const resource = watch("resource");

    const [isChecked, setChecked] = useState(false);
    const toggle = () => {
        if (isChecked) {
            setValue("resourceId", undefined);
        }

        setChecked((old) => !old);
    };

    return (
        <>
            <FormControlLabel
                control={<Checkbox checked={isChecked} onClick={toggle} />}
                label={t("Label assignment")}
                sx={{
                    color: "text.secondary",
                }}
            />

            {isChecked ? (
                <>
                    {resource === "property" ? (
                        <RHFPropertyAutocomplete />
                    ) : null}
                    {resource === "customer" ? (
                        <RHFCustomerAutocomplete />
                    ) : null}

                    {/* Add more to support ... */}
                </>
            ) : null}
        </>
    );
};

export default Assign;
