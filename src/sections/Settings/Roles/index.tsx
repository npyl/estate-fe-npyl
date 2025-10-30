import { useGetAllRolesQuery } from "@/services/roles";
import { RoleMini } from "@/types/roles";
import { FC, useCallback, useState } from "react";
import Stack from "@mui/material/Stack";
import CreateFab from "./CreateFab";
import CreateOrEdit from "./CreateOrEdit";
import Role, { RoleProps } from "@/ui/Role";
import useActionsDialog from "./ActionsPopover/useActionsPopover";

// --------------------------------------------------------------------------------------

interface RoleWithActions extends Omit<RoleProps, "onClick"> {
    onClick: 
}

const RoleWithActions: FC<RoleProps> = ({ onClick, ...props }) => {
    return <Role {...props} />;
};

const getRole = (onClick: (id: number) => void) => (r: RoleMini) => (
    <RoleWithActions key={r.id} r={r} onEdit={onEdit} />
);

// --------------------------------------------------------------------------------------

const List = () => {
    const { data } = useGetAllRolesQuery();
    const [roleId, setRoleId] = useState<number>();
    const clear = useCallback(() => setRoleId(undefined), []);

    const {  } = useActionsDialog();

    return (
        <>
            <Stack direction="row" p={1} flexWrap="wrap" gap={1}>
                {data?.map(getRole(setRoleId))}
            </Stack>

            {roleId ? <CreateOrEdit roleId={roleId} onCancel={clear} /> : null}
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
