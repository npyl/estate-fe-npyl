import { InputLabel, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledButton } from "src/pages/components/BulkEditDrawer/style";
import CheckIcon from "@mui/icons-material/Check";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface DefaultOrEditProps {
    label: string;
    children: React.ReactNode;
    onDisable: () => void;
}

export const DefaultOrEdit = ({
    label,
    children,
    onDisable,
}: DefaultOrEditProps) => {
    const { t } = useTranslation();

    const [checked, setChecked] = useState(true);

    useEffect(() => {
        checked && onDisable();
    }, [checked]);

    return (
        <Stack>
            <InputLabel>{label}</InputLabel>
            <StyledButton
                variant="outlined"
                endIcon={
                    checked ? (
                        <CheckIcon color="success" />
                    ) : (
                        <Close color="error" />
                    )
                }
                onClick={() => setChecked(!checked)}
            >
                {t("Default Value")}
            </StyledButton>
            {!checked && children}
        </Stack>
    );
};
