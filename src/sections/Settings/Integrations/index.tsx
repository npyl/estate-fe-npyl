import React from "react";
import Stack from "@mui/material/Stack";
import RightMoveItem from "./RightMoveItem";
import StandardItems from "./StandardItems";
import GoogleWorkspace from "./GoogleWorkspace";
import PublicSites from "./PublicSites";

const Integrations: React.FC = () => (
    <Stack spacing={1}>
        <PublicSites />
        <GoogleWorkspace />
        <StandardItems />
        <RightMoveItem />
    </Stack>
);

export default Integrations;
