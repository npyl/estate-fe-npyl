import { useGetAllRolesQuery } from "@/services/roles";
import { RoleMini } from "@/types/roles";
import { FC, MouseEvent, useCallback } from "react";
import Stack from "@mui/material/Stack";
import CreateFab from "./CreateFab";
import Role from "@/ui/Role";
import useActionsDialog from "./ActionsPopover/useActionsPopover";
import ActionsPopover from "./ActionsPopover";
import { TClickCb } from "./ActionsPopover/types";

// --------------------------------------------------------------------------------------

interface RoleWithActionsProps {
    r: RoleMini;
    onClick: TClickCb;
}

const RoleWithActions: FC<RoleWithActionsProps> = ({
    r,
    onClick: _onClick,
}) => {
    const onClick = useCallback(
        (e: MouseEvent<HTMLDivElement>) => _onClick(e, r.id),
        [_onClick, r.id]
    );
    return <Role onClick={onClick} r={r} />;
};

const getRole = (onClick: TClickCb) => (r: RoleMini) => (
    <RoleWithActions key={r.id} r={r} onClick={onClick} />
);

// --------------------------------------------------------------------------------------

const List = () => {
    const { data } = useGetAllRolesQuery();
    const { ref, open } = useActionsDialog();

    return (
        <>
            <Stack direction="row" p={1} flexWrap="wrap" gap={1}>
                {data?.map(getRole(open))}
            </Stack>

            <ActionsPopover ref={ref} />
        </>
    );
};

// --------------------------------------------------------------------------------------

const Roles = () => (
    <>
        <List />
        <CreateFab />
    </>
);

export default Roles;
