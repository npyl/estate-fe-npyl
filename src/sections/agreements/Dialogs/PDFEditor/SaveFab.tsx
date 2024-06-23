import Fab from "@mui/material/Fab";
import Stack, { StackProps } from "@mui/material/Stack";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from "react-i18next";

const SaveFab: React.FC<StackProps> = (props) => {
    const { t } = useTranslation();

    return (
        <Stack {...props} direction="row" spacing={1}>
            <Fab variant="extended">
                <SaveIcon />
                {t("Save")}
            </Fab>
        </Stack>
    );
};

export default SaveFab;
