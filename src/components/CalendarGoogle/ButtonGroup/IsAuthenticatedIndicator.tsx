import { useCalendarAuth } from "@/services/calendar";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import AvatarButton from "./AvatarButton";
import { useTranslation } from "react-i18next";

const IsAuthenticatedIndicator = () => {
    const { t } = useTranslation();

    const { isAuthenticated, userInfo, isLoading, authenticate } =
        useCalendarAuth();

    if (isLoading) {
        return <Skeleton variant="circular" width="46px" height="46px" />;
    }

    if (isAuthenticated) {
        return <AvatarButton userInfo={userInfo} />;
    }

    return <Button onClick={authenticate}>{t("Login")}</Button>;
};

export default IsAuthenticatedIndicator;
