import { FC } from "react";
import { Theme } from "@mui/material";
import { NormalBadge, NormalBadgeProps } from "@/ui/Cards/PropertyCard/styled";

const getColor = (theme: Theme) =>
    theme.palette.mode === "light" ? "#854D0E" : "warning.light";

interface CodeBadgeProps extends Omit<NormalBadgeProps, "name" | "color"> {
    code: string;
}

const CodeBadge: FC<CodeBadgeProps> = ({ code, sx, ...props }) => (
    <NormalBadge
        name={code}
        color="#ffcc00"
        sx={{ color: getColor, maxWidth: "150px", ...sx }}
        {...props}
    />
);

export type { CodeBadgeProps };
export default CodeBadge;
