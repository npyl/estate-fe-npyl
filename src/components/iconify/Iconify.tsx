import { forwardRef, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { Box, BoxProps } from "@mui/material";
import { IconifyProps } from "./types";

interface Props extends BoxProps {
    icon: IconifyProps;
}

const Iconify = forwardRef<SVGSVGElement, Props>(
    ({ icon, width = 20, sx, ...other }, ref) => {
        const iconRef = useRef<SVGSVGElement>(null);

        // Make sure forwarded ref is updated when local ref updates
        useEffect(() => {
            if (ref) {
                if (typeof ref === "function") {
                    ref(iconRef.current);
                } else {
                    ref.current = iconRef.current;
                }
            }
        }, [iconRef, ref]);

        return (
            <Box sx={{ width: width, height: width, ...sx }} {...other}>
                <Icon ref={iconRef} icon={icon} />
            </Box>
        );
    }
);

Iconify.displayName = "Iconify";

export default Iconify;
