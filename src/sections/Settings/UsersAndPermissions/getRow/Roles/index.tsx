import { RoleMini } from "@/types/roles";
import Role from "@/ui/Role";
import Stack from "@mui/material/Stack";
import { FC } from "react";

// -----------------------------------------------------------------------------

const getRole = (r: RoleMini) => <Role key={r.id} r={r} />;

// -----------------------------------------------------------------------------

interface RolesProps {
    roles: RoleMini[];
}

const Roles: FC<RolesProps> = ({ roles }) => {
    return (
        <Stack gap={1} flexWrap="wrap">
            {roles?.map(getRole)}
        </Stack>
    );
};

export default Roles;
