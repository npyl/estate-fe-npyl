import { Stack } from "@mui/material";
import Search from "./Search";
import UserSelect from "./UserSelect";
import { SpaceBetween } from "@/components/styled";
import AddButtons from "./AddButtons";

const Bar = () => (
    <SpaceBetween alignItems="center">
        <Stack direction="row" spacing={1}>
            <Search />
            <UserSelect />
        </Stack>

        <AddButtons />
    </SpaceBetween>
);

export default Bar;
