import { useAuth } from "@/hooks/use-auth";
import {
    useAuthenticateMutation,
    useIsAuthenticatedQuery,
} from "@/services/calendar";
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

    return { isAuthenticated, authenticate, isLoading };
};

// -------------------------------------------------------------------------

const IsAuthenticatedIndicator = () => {
    const { isAuthenticated, isLoading, authenticate } = useCalendarAuth();

    if (isLoading) {
        return <Skeleton width="150px" height={58} />;
    }

    if (isAuthenticated) {
        return "AUTH!";
    }

    return <Button onClick={authenticate}>Authenticate!</Button>;
};

export default IsAuthenticatedIndicator;
