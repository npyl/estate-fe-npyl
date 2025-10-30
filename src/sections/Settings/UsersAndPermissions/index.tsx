import { useAllUsersQuery } from "@/services/user";
import CreateButton from "./CreateButton";
import { useMemo } from "react";
import getRow from "./getRow";
import Paper from "@mui/material/Paper";

const UsersAndPermissions = () => {
    const { data } = useAllUsersQuery();

    const activeStatuses = useMemo(
        () => data?.map(({ isActive }) => isActive) ?? [],
        [data]
    );

    return (
        <>
            <CreateButton />

            <Paper>{data?.map(getRow(activeStatuses))}</Paper>
        </>
    );
};

export default UsersAndPermissions;
