import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/Label";
import { useFormContext } from "react-hook-form";
import { ILabelForm } from "./types";

const Preview = () => {
    const { t } = useTranslation();
    const { watch } = useFormContext<ILabelForm>();

    const labelName = watch("name");
    const pickerColor = watch("color");

    return (
        <Box my={2}>
            <Typography variant="subtitle2" mb={1}>
                {t("Preview")}
            </Typography>

            <Label color={pickerColor} name={labelName || t("New Label")} />
        </Box>
    );
};

export default Preview;
