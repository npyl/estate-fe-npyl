import Permissions from "./Permissions";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Basic from "./Basic";
import Users from "./Users";

const Content = () => (
    <Stack spacing={3}>
        <Basic />

        <Divider />

        <Permissions />

        <Divider />

        <Users />
    </Stack>
);

export default Content;
