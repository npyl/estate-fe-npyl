import Fab from "@mui/material/Fab";
import Stack, { StackProps } from "@mui/material/Stack";
import React, { MouseEvent } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from "react-i18next";

interface SaveFabProps extends Omit<StackProps, "onClick"> {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SaveFab: React.FC<SaveFabProps> = ({ onClick, ...props }) => {
    const { t } = useTranslation();

    return (
        <Stack {...props} direction="row" spacing={1}>
            <Fab variant="extended" onClick={onClick}>
                <SaveIcon />
                {t("Save")}
            </Fab>
        </Stack>
    );
};

export default SaveFab;
