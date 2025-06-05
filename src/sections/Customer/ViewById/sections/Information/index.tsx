import { Stack } from "@mui/material";
import B2BMembers from "./B2BMembers";
import Information from "./Information";

const InformationSection = () => (
    <Stack spacing={1}>
        <Information />
        <B2BMembers />
    </Stack>
);

export default InformationSection;
