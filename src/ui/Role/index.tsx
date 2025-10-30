import { RoleMini } from "@/types/roles";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";

interface RoleProps extends Omit<BoxProps, "color" | "children"> {
    r: RoleMini;
}

const Role: FC<RoleProps> = ({ r, ...props }) => (
    <Box
        height="fit-content"
        width="fit-content"
        px={2}
        py={0.75}
        borderRadius={2}
        bgcolor={r.color}
        sx={{
            color: (theme) => theme.palette.getContrastText(r.color),
            cursor: "pointer",
        }}
        {...props}
    >
        <Typography variant="body2" noWrap fontWeight={500}>
            {r.name}
        </Typography>
    </Box>
);

export type { RoleProps };
export default Role;
