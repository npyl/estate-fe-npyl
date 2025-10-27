import { Label, LabelProps } from "@/components/Label";
import { useGetAllRolesQuery } from "@/services/roles";
import { RoleMini } from "@/types/roles";
import React, { FC, useCallback, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import CreateOrEdit from "./CreateOrEdit";
import CreateFab from "@/ui/CreateFab";

// --------------------------------------------------------------------------------------

interface RoleProps extends Omit<LabelProps, "color" | "name" | "onClick"> {
    r: RoleMini;
    onClick: (id: number) => void;
}

const Role: FC<RoleProps> = ({ r, onClick, ...props }) => (
    <Label
        color={"#eee"}
        name={r.name}
        onClick={() => onClick(r.id)}
        {...props}
    />
);

const getRole = (onClick: (id: number) => void) => (r: RoleMini) => (
    <Role key={r.id} r={r} onClick={onClick} />
);

// --------------------------------------------------------------------------------------

const DO_NOT_RERENDER = () => false;

interface SidebarProps {
    onRoleClick: (id: number) => void;
}

const Sidebar: FC<SidebarProps> = React.memo(({ onRoleClick }) => {
    const { data } = useGetAllRolesQuery();
    return (
        <Stack spacing={1} p={1}>
            {data?.map(getRole(onRoleClick))}
        </Stack>
    );
}, DO_NOT_RERENDER);

// --------------------------------------------------------------------------------------

const Roles = () => {
    const [roleMode, setRoleMode] = useState<number | "create">();
    const setCreate = useCallback(() => setRoleMode("create"), []);
    const onClear = useCallback(() => setRoleMode(undefined), []);

    return (
        <>
            <Grid container>
                <Grid
                    xs={12}
                    sm={1.5}
                    borderRight="1px solid"
                    borderColor="divider"
                    maxHeight="100vh"
                    overflow="hidden auto"
                >
                    <Sidebar onRoleClick={setRoleMode} />
                </Grid>
                <Grid xs={12} sm={10.5}>
                    <CreateOrEdit roleMode={roleMode} onCancel={onClear} />
                </Grid>
            </Grid>

            <CreateFab onClick={setCreate} />
        </>
    );
};

export default Roles;
