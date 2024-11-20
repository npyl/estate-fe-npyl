import WorkspaceIndicator from "@/sections/Google/IsAuthenticatedIndicator";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
const RHFAutocomplete = dynamic(() => import("./RHF"));

const GoogleWorkspaceEmail = () => (
    <Stack
        direction="row-reverse"
        spacing={1}
        alignItems="center"
        bgcolor="background.default"
        p={1}
        borderRadius="16px"
    >
        <WorkspaceIndicator>
            <RHFAutocomplete />
        </WorkspaceIndicator>
    </Stack>
);

export default GoogleWorkspaceEmail;
