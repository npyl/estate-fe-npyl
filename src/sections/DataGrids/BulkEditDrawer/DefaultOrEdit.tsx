import { InputLabel, Stack } from "@mui/material";
import React, { useState } from "react";
import { StyledButton } from "@/sections/DataGrids/BulkEditDrawer/style";
import CheckIcon from "@mui/icons-material/Check";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";

interface DefaultOrEditProps {
    name: string;
    label: string;
    children: React.ReactNode;
}

const DefaultOrEdit = ({ name, label, children }: DefaultOrEditProps) => {
    const { t } = useTranslation();

    const [checked, setChecked] = useState(true);

    const {
        setValue,
        formState: { dirtyFields, defaultValues },
    } = useFormContext();

    const isChanged = Boolean(dirtyFields[name]);

    const endIcon = isChanged ? (
        <Close color="error" />
    ) : (
        <CheckIcon color="success" />
    );

    const onDisable = () =>
        setValue(name, defaultValues?.[name], { shouldDirty: true });

    const toggleChecked = () => {
        if (isChanged) onDisable();
        setChecked((old) => !old);
    };

    return (
        <Stack>
            <InputLabel>{label}</InputLabel>
            <StyledButton
                variant="outlined"
                endIcon={endIcon}
                onClick={toggleChecked}
            >
                {t("Default Value")}
            </StyledButton>

            {!checked ? children : null}
        </Stack>
    );
};

export default DefaultOrEdit;
