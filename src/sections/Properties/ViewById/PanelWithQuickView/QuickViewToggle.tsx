import { SxProps, Theme } from "@mui/material";
import Stack, { StackProps } from "@mui/material/Stack";
import { FC } from "react";
import ToggleButton from "./ToggleButton";

const QuickViewToggleSx: SxProps<Theme> = {
    position: "relative",

    "& .ToggleButton": {
        display: "none",
        position: "absolute",
        top: 1,
        right: 1,
    },
    "&:hover .ToggleButton": {
        display: "block",
    },
};

interface QuickViewToggleProps extends StackProps {
    sectionName: string;
}

const QuickViewToggle: FC<QuickViewToggleProps> = ({
    sectionName,
    children,
    sx,
    ...props
}) => (
    <Stack sx={{ ...QuickViewToggleSx, ...sx }} {...props}>
        {children}
        <ToggleButton sectionName={sectionName} />
    </Stack>
);

export default QuickViewToggle;
