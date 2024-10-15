import { useAuth } from "@/hooks/use-auth";
import {
    useAuthenticateMutation,
    useIsAuthenticatedQuery,
} from "@/services/calendar";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import AvatarButton from "./AvatarButton";

// -------------------------------------------------------------------------

const useCalendarAuth = () => {
    const { user } = useAuth();

    const { data, isLoading } = useIsAuthenticatedQuery(user?.id!, {
        skip: !user?.id,
    });

    const [authenticateCb] = useAuthenticateMutation();

    const isAuthenticated = data?.isAuthenticated;
    const authenticate = () => authenticateCb(user!.id);

    return {
        isAuthenticated,
        userInfo: data?.userInfo,
        authenticate,
        isLoading,
    };
};

// -------------------------------------------------------------------------

const IsAuthenticatedIndicator = () => {
    const { isAuthenticated, userInfo, isLoading, authenticate } =
        useCalendarAuth();

    if (true) {
        return <Skeleton variant="circular" width="46px" height="46px" />;
    }

    if (isAuthenticated) {
        return <AvatarButton userInfo={userInfo} />;
    }

    return <Button onClick={authenticate}>Authenticate!</Button>;
};

export default IsAuthenticatedIndicator;
