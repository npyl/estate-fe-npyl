import Box, { BoxProps } from "@mui/material/Box";
import { FC } from "react";

// ---------------------------------------------------------------------------

const getSectionId = (name: string) => `NavSection-${name}`;

const NavSection: FC<BoxProps> = (props) => <Box {...props} />;

export { getSectionId };
export default NavSection;
