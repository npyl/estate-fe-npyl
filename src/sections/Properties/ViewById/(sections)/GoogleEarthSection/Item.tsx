import GoogleEarthIcon from "@/assets/logo/GoogleEarth";
import { SpaceBetween } from "@/components/styled";
import { errorToast } from "@/components/Toaster";
import { IPropertyFile } from "@/types/file";
import DownloadIcon from "@mui/icons-material/Download";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

// --------------------------------------------------------------------------

const InstallNotice = () => {
    const { t } = useTranslation();
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            p={1}
            bgcolor="background.neutral"
            borderRadius={1}
        >
            <InfoIcon fontSize="small" color="info" />

            <Typography
                alignItems="center"
                color="text.secondary"
                fontSize="15px"
            >
                {t("GOOGLE_EARTH_INSTALLED")}
            </Typography>
        </Stack>
    );
};

// --------------------------------------------------------------------------

interface ItemProps {
    googleEarth: IPropertyFile;
}

const Item: FC<ItemProps> = ({ googleEarth }) => {
    const handleDownload = useCallback(() => {
        if (!googleEarth?.url) {
            errorToast("GOOGLE_EARTH_FAULTY_URL");
            return;
        }

        window.open(googleEarth.url, "_blank");
    }, [googleEarth?.url]);

    return (
        <Stack spacing={2}>
            <InstallNotice />

            <SpaceBetween alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                    <GoogleEarthIcon width={50} height={50} />

                    <Typography ml={1} variant="subtitle2">
                        {googleEarth.filename}
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton onClick={handleDownload}>
                        <DownloadIcon />
                    </IconButton>
                </Stack>
            </SpaceBetween>
        </Stack>
    );
};

export default Item;
