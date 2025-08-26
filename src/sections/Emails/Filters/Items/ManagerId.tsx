import ManagerAutocomplete from "@/ui/Autocompletes/Manager";
import useIsOfficeAdmin from "@/sections/Google/useIsOfficeAdmin";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import { Skeleton, SxProps, Theme } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useAuth } from "@/sections/use-auth";
import { useAllUsersQuery } from "@/services/user";
import { IUser } from "@/types/user";

const WIDTH = "300px";

const onlyWithEmail = ({ workspaceEmail }: IUser) => Boolean(workspaceEmail);

const Sx: SxProps<Theme> = {
    width: WIDTH,
};

const Filter = () => {
    const { manager, setManager } = useFiltersContext();

    const { data, isLoading } = useAllUsersQuery();

    const { user } = useAuth();
    const value = useMemo(() => {
        if (!manager) return user?.id;
        return data?.find(({ workspaceEmail }) => workspaceEmail === manager)
            ?.id;
    }, [user?.id, manager, data]);

    const onChange = useCallback(
        (v: number) => {
            const found = data?.find(({ id }) => id === v)?.workspaceEmail;
            if (!found) return;
            setManager(found);
        },
        [data]
    );

    if (isLoading) return <Skeleton width={WIDTH} height="58px" />;

    return (
        <ManagerAutocomplete
            sx={Sx}
            value={value}
            onChange={onChange}
            optionFilter={onlyWithEmail}
        />
    );
};

const ManagerIdFilter = () => {
    const { gwIsAdmin, isChecking } = useIsOfficeAdmin();
    if (isChecking) return <Skeleton width={WIDTH} height="58px" />;
    if (!gwIsAdmin) return null;
    return <Filter />;
};

export default ManagerIdFilter;
