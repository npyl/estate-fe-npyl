import { useAuth } from "@/hooks/use-auth";
import {
    useAuthenticateMutation,
    useIsAuthenticatedQuery,
} from "@/services/calendar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";

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

    if (isLoading) {
        return <Skeleton width="150px" height={58} />;
    }

    if (isAuthenticated) {
        return <Avatar src={userInfo?.picture} />;
    }

    return <Button onClick={authenticate}>Authenticate!</Button>;
};

export default IsAuthenticatedIndicator;
