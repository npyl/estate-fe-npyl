import { useCalendarAuth } from "@/services/calendar";
import Button from "@mui/material/Button";
import AvatarButton from "@/components/CalendarGoogle/ButtonGroup/AvatarButton";
import { useTranslation } from "react-i18next";
import { FC, PropsWithChildren } from "react";
import { SxProps, Theme } from "@mui/material";
import OriginalGoogleLogo from "@/assets/logo/OriginalGoogleLogo";
import { HideText } from "@/components/styled";
import AvatarSkeleton from "./AvatarSkeleton";

// ------------------------------------------------------------------------

interface IsAuthenticatedIndicatorProps extends PropsWithChildren {
    sx?: SxProps<Theme>;
}

const IsAuthenticatedIndicator: FC<IsAuthenticatedIndicatorProps> = ({
    sx,
    children,
}) => {
    const { t } = useTranslation();

    const { isAuthenticated, userInfo, isLoading, authenticate } =
        useCalendarAuth();

    if (isLoading) return <AvatarSkeleton sx={sx} />;

    if (!isAuthenticated)
        return (
            <Button
                onClick={authenticate}
                startIcon={<OriginalGoogleLogo />}
                sx={{ ...(HideText as any), ...sx }}
            >
                {t("Login")}
            </Button>
        );

    return (
        <>
            <AvatarButton userInfo={userInfo} sx={sx} />
            {children}
        </>
    );
};

// ------------------------------------------------------------------------

export type { IsAuthenticatedIndicatorProps };
export default IsAuthenticatedIndicator;
