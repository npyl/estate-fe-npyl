import { Label } from "@/components/Label";
import { useGetAllRolesQuery } from "@/services/roles";
import { RoleMini } from "@/types/roles";
import CreateFab from "./CreateFab";
import { FC } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import CreateOrEdit from "./CreateOrEdit";

// --------------------------------------------------------------------------------------

interface RoleProps {
    r: RoleMini;
}

const Role: FC<RoleProps> = ({ r }) => <Label color={r.color} name={r.name} />;

const getRole = (r: RoleMini) => <Role key={r.id} r={r} />;

const Sidebar = () => {
    const { data } = useGetAllRolesQuery();
    return <Stack>{data?.map(getRole)}</Stack>;
};

// --------------------------------------------------------------------------------------

const Roles = () => (
    <>
        <Grid container>
            <Grid
                xs={12}
                sm={1.5}
                borderRight="1px solid"
                borderColor="divider"
                height="100vh"
            >
                <Sidebar />
            </Grid>
            <Grid xs={12} sm={10.5}>
                <CreateOrEdit />
            </Grid>
        </Grid>

        <CreateFab />
    </>
);

export default Roles;
