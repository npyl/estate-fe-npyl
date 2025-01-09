import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/Label";
import { useWatch } from "react-hook-form";

const Preview = () => {
    const { t, i18n } = useTranslation();

    const labelName = useWatch({ name: "name" });
    const pickerColor = useWatch({ name: "color" });

    const placeholder = i18n.language === "en" ? "New Label" : "Νέα Ετικέτα";

    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
        >
            <Typography variant="subtitle2" mb={1}>
                {t("Preview")}
            </Typography>

            <Label color={pickerColor} name={labelName || placeholder} />
        </Stack>
    );
};

export default Preview;
