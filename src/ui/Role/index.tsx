import { Label, LabelProps } from "@/components/Label";
import { RoleMini } from "@/types/roles";
import { FC } from "react";

interface RoleProps extends Omit<LabelProps, "color" | "name"> {
    r: RoleMini;
}

const Role: FC<RoleProps> = ({ r, ...props }) => (
    <Label
        opaque
        color={r.color || "primary"}
        name={r.name}
        sx={{ cursor: "pointer" }}
        {...props}
    />
);

export type { RoleProps };
export default Role;
