import { useAuth } from "@/hooks/use-auth";
import { useIsAdminQuery } from "@/services/calendar";

// gwIsAdmin: is admin (on a Google Workspace)
// gwUser: Google Workspace User

const useIsOfficeAdmin = () => {
    const { user } = useAuth();
    const { data, isLoading } = useIsAdminQuery(user?.id!, {
        skip: user?.id === undefined,
    });

    return {
        // ... (google workspace)
        gwIsAdmin: data?.isAdmin,
        gwUser: data?.user,
        isChecking: isLoading,
        // ... (property pro)
        userId: user?.id,
    };
};

export default useIsOfficeAdmin;
