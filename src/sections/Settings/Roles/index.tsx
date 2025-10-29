import { Label, LabelProps } from "@/components/Label";
import { useGetAllRolesQuery } from "@/services/roles";
import { RoleMini } from "@/types/roles";
import { FC, useCallback, useState } from "react";
import Stack from "@mui/material/Stack";
import CreateFab from "./CreateFab";
import CreateOrEdit from "./CreateOrEdit";

// --------------------------------------------------------------------------------------

interface RoleProps extends Omit<LabelProps, "color" | "name" | "onClick"> {
    r: RoleMini;
    onClick: (id: number) => void;
}

const Role: FC<RoleProps> = ({ r, onClick, ...props }) => (
    <Label
        opaque
        color={r.color || "primary"}
        name={r.name}
        onClick={() => onClick(r.id)}
        {...props}
    />
);

const getRole = (onClick: (id: number) => void) => (r: RoleMini) => (
    <Role key={r.id} r={r} onClick={onClick} />
);

// --------------------------------------------------------------------------------------

const List = () => {
    const { data } = useGetAllRolesQuery();
    const [roleId, setRoleId] = useState<number>();
    const clear = useCallback(() => setRoleId(undefined), []);

    return (
        <>
            <Stack direction="row" spacing={1} p={1}>
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
