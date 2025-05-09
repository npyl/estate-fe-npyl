import ManagerAutocomplete from "@/sections/_Autocompletes/Manager";
import useIsOfficeAdmin from "@/sections/Google/useIsOfficeAdmin";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import { Skeleton, SxProps, Theme } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useAllUsersQuery } from "@/services/user";
import { IUser } from "@/types/user";

const onlyWithEmail = ({ workspaceEmail }: IUser) => Boolean(workspaceEmail);

const Sx: SxProps<Theme> = {
    width: "300px",
};

const Filter = () => {
    const { filters, setFrom } = useFiltersContext();
    const { from } = filters;

    const { data, isLoading } = useAllUsersQuery();

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

    if (isLoading) return <Skeleton width="100px" height="58px" />;

    return (
        <ManagerAutocomplete
            sx={Sx}
            value={value}
            onChange={onChange}
            optionFilter={onlyWithEmail}
        />
    );
};

const FromFilter = () => {
    const { gwIsAdmin, isChecking } = useIsOfficeAdmin();
    if (isChecking) return <Skeleton width="100px" height="58px" />;
    if (!gwIsAdmin) return null;
    return <Filter />;
};

export default FromFilter;
