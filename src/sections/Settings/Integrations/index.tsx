import React from "react";
import Stack from "@mui/material/Stack";
import RightMoveItem from "./RightMoveItem";
import StandardItems from "./StandardItems";
import GoogleWorkspace from "./GoogleWorkspace";
import PublicSites from "./PublicSites";
import Container from "@mui/material/Container";

const Integrations: React.FC = () => (
    <Container maxWidth="md">
        <Stack spacing={1}>
            <GoogleWorkspace />
            <PublicSites />
            <StandardItems />
            <RightMoveItem />
        </Stack>
    </Container>
);

export default Integrations;
