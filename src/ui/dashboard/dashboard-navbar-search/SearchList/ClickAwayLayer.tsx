import Box from "@mui/material/Box";
import { FC } from "react";

interface ClickAwayLayerProps {
    onClick: VoidFunction;
}

const ClickAwayLayer: FC<ClickAwayLayerProps> = ({ onClick }) => (
    <Box
        position="fixed"
        height="100vh"
        width="100vw"
        top={({ layout }) => layout.nav.topbarHeight}
        left={0}
        onClick={onClick}
    />
);

export default ClickAwayLayer;
