import ManagerAutocomplete from "@/sections/_Autocompletes/Manager";
import useIsOfficeAdmin from "@/sections/Google/useIsOfficeAdmin";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import { SxProps, Theme } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useAllUsersQuery } from "@/services/user";

const Sx: SxProps<Theme> = {
    width: "300px",
};

const Filter = () => {
    const { from, setFrom } = useFiltersContext();

    const { data } = useAllUsersQuery();

    const { user } = useAuth();
    const value = useMemo(() => {
        if (!from) return user?.id;
        return data?.find(({ workspaceEmail }) => workspaceEmail === from)?.id;
    }, [user?.id, from, data]);

    const onChange = useCallback(
        (v: number) => {
            const found = data?.find(({ id }) => id === v)?.workspaceEmail;
            if (!found) return;
            setFrom(found);
        },
        [data]
    );

    return <ManagerAutocomplete sx={Sx} value={value} onChange={onChange} />;
};

const FromFilter = () => {
    const { gwIsAdmin } = useIsOfficeAdmin();
    if (!gwIsAdmin) return null;
    return <Filter />;
};

export default FromFilter;
