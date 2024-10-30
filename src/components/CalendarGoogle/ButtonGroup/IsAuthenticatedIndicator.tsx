import { useAuth } from "@/hooks/use-auth";
import {
    useAuthenticateMutation,
    useIsAuthenticatedQuery,
} from "@/services/calendar";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import AvatarButton from "./AvatarButton";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

// -------------------------------------------------------------------------

const useCalendarAuth = () => {
    const { t } = useTranslation();

    const { user } = useAuth();

    const { data, isLoading } = useIsAuthenticatedQuery(user?.id!, {
        skip: !user?.id,
    });

    const [authenticateCb] = useAuthenticateMutation();

    const isAuthenticated = data?.isAuthenticated;

    const authenticate = async () => {
        const res = await authenticateCb(user!.id).unwrap();
        if (!res) toast.error(t("GOOGLE_OATH_FAIL"));
    };

    return {
        isAuthenticated,
        userInfo: data?.userInfo,
        authenticate,
        isLoading,
    };
};

// -------------------------------------------------------------------------

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
