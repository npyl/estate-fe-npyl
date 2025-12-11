import { getSafeHexColor } from "@/theme/colors";
import { RoleMini } from "@/types/roles";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC, useMemo } from "react";

interface RoleProps extends Omit<BoxProps, "color" | "children"> {
    r: RoleMini;
}

const Role: FC<RoleProps> = ({ r: { color: _color, ...r }, ...props }) => {
    const color = useMemo(() => getSafeHexColor(_color), [_color]);
    return (
        <Box
            height="fit-content"
            width="fit-content"
            px={2}
            py={0.75}
            borderRadius={2}
            bgcolor={color}
            sx={{
                color: (theme) => theme.palette.getContrastText(color),
                cursor: "pointer",
            }}
            {...props}
        >
            <Typography variant="body2" noWrap fontWeight={500}>
                {r.name}
            </Typography>
        </Box>
    );
};

export type { RoleProps };
export default Role;
