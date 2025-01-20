import Box, { BoxProps } from "@mui/material/Box";
import { FC, ReactNode } from "react";
import isNamedComponent from "./isNamedComponent";

// ---------------------------------------------------------------------------

const getSectionId = (name: string) => `NavSection-${name}`;

const getSection = (content: ReactNode) => {
    if (!isNamedComponent(content))
        throw new Error("Invalid section component");

    const name = content.type.name;
    const id = getSectionId(name);

    return (
        <NavSection key={id} id={id}>
            {content}
        </NavSection>
    );
};

const NavSection: FC<BoxProps> = (props) => <Box {...props} />;

export { getSection, getSectionId };
export default NavSection;
