import { Box } from "@mui/material";
import { ReactNode } from "react";
import EnterSvg from "./svg";

interface EnterOverlayProps {
    show: boolean;
    children: ReactNode;
}

const EnterOverlay = ({ show, children }: EnterOverlayProps) => (
    <Box position="relative">
        {children}
        {show ? (
            <Box
                position="absolute"
                top="50%"
                right={5}
                style={{
                    transform: "translateY(-50%)",
                }}
            >
                <EnterSvg />
            </Box>
        ) : null}
    </Box>
);

export default EnterOverlay;
