// @mui
import { Stack, StackProps, Typography } from "@mui/material";
// assets
import { UploadIllustration } from "../../assets/illustrations";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

function Placeholder({ sx, ...other }: StackProps) {
    const { t } = useTranslation();

    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            direction={{
                xs: "column",
                md: "row",
            }}
            sx={{
                width: 1,
                textAlign: {
                    xs: "center",
                    md: "left",
                },
                ...sx,
            }}
            {...other}
        >
            <UploadIllustration sx={{ width: 100 }} />

            <Typography gutterBottom variant="h5">
                {t("Drop or Select files")}
            </Typography>
        </Stack>
    );
}

export default Placeholder;
