import getBorderColor from "@/theme/borderColor";
import { SxProps, Theme } from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { forwardRef } from "react";

const Sx: SxProps<Theme> = {
    border: "1px solid",
    borderColor: getBorderColor,
    borderRadius: "100%",
};

interface RoundIconButtonProps extends IconButtonProps {}

const RoundIconButton = forwardRef<HTMLButtonElement, RoundIconButtonProps>(
    ({ sx, ...props }, ref) => (
        <IconButton ref={ref} sx={{ ...Sx, ...sx }} {...props} />
    )
);

export type { RoundIconButtonProps };
export default RoundIconButton;
