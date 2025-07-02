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
                minHeight: 1,
                height: 1,
                maxHeight: 1,
                width: 1,
                textAlign: {
                    xs: "center",
                    md: "left",
                },
                ...sx,
            }}
            {...other}
        >
            <UploadIllustration width={100} height={1} />

            <Typography gutterBottom variant="h5">
                {t("Drop or Select files")}
            </Typography>
        </Stack>
    );
}

export default Placeholder;
