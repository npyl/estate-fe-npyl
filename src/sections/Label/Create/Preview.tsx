import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/Label";
import { useFormContext } from "react-hook-form";
import { ILabelForm } from "./types";

const Preview = () => {
    const { t, i18n } = useTranslation();
    const { watch } = useFormContext<ILabelForm>();

    const labelName = watch("name");
    const pickerColor = watch("color");

    const placeholder = i18n.language === "en" ? "New Label" : "Νέα Ετικέτα";

    return (
        <Box>
            <Typography variant="subtitle2" mb={1}>
                {t("Preview")}
            </Typography>

            <Label color={pickerColor} name={labelName || placeholder} />
        </Box>
    );
};

export default Preview;
