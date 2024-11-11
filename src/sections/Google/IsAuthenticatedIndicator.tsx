import { useCalendarAuth } from "@/services/calendar";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import AvatarButton from "@/components/CalendarGoogle/ButtonGroup/AvatarButton";
import { useTranslation } from "react-i18next";
import GoogleIcon from "@mui/icons-material/Google";
import { FC, PropsWithChildren } from "react";
import { SxProps, Theme } from "@mui/material";

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

    if (isLoading)
        return (
            <Skeleton variant="circular" width="46px" height="46px" sx={sx} />
        );

    if (!isAuthenticated)
        return (
            <Button onClick={authenticate} startIcon={<GoogleIcon />} sx={sx}>
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

export default IsAuthenticatedIndicator;
