import { Checkbox, FormControlLabel } from "@mui/material";
import Fab from "@mui/material/Fab";
import Stack, { StackProps } from "@mui/material/Stack";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import useToggle from "@/hooks/useToggle";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";
import { useTranslation } from "react-i18next";

const StyledCheckbox = styled(FormControlLabel)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: "20px",
    paddingRight: theme.spacing(2),
    borderColor: getBorderColor2(theme),
}));

const SaveFab: React.FC<StackProps> = (props) => {
    const { t } = useTranslation();

    const [isDraft, toggleDraft] = useToggle();

    return (
        <Stack {...props} direction="row" spacing={1}>
            <StyledCheckbox
                value={isDraft}
                onClick={toggleDraft}
                control={<Checkbox />}
                label={t("Save as Draft")}
            />

            <Fab variant="extended">
                <SaveIcon />
                {t("Save")}
            </Fab>
        </Stack>
    );
};

export default SaveFab;
