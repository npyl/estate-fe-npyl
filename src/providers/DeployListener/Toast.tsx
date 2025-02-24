import { useCallback } from "react";
import orgToast from "react-hot-toast";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Logo from "@/assets/logo/mini";

const Toast = (other: object) => {
    const { t } = useTranslation();

    // INFO: onDismiss is automatically passed to every message that is react component (from @/components/Toast)
    const onDismiss =
        "onDismiss" in other ? (other.onDismiss as VoidFunction) : undefined;

    const handleLogout = useCallback(() => {
        onDismiss?.();
        window.location.reload();
    }, [onDismiss]);

    return (
        <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Logo width={30} height={30} />
                <Stack>
                    <Typography fontWeight="bold">
                        {t("_DEPLOY_VERSION_MISMATCH_0")}
                    </Typography>
                    <Typography>{t("_DEPLOY_VERSION_MISMATCH_1")}</Typography>
                </Stack>
            </Stack>

            <Stack
                pl="40px"
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
            >
                <Button
                    variant="text"
                    sx={{
                        color: "text.secondary",
                    }}
                    onClick={handleLogout}
                >
                    {t("Refresh")}
                </Button>
            </Stack>
        </Stack>
    );
};

const toast = () => orgToast(<Toast />, { duration: Infinity });

export default toast;
