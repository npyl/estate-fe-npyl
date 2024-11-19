import { Stack, SxProps, Theme } from "@mui/material";
import Search from "./Search";
import UserSelect from "./UserSelect";
import { SpaceBetween } from "@/components/styled";
import AddButtons from "./AddButtons";
import Priority from "./Priority";

const BarSx: SxProps<Theme> = {
    position: "sticky",
    top: 64,
    bgcolor: "background.default",
    zIndex: 50,
    borderRadius: "10px",
    p: 1,
    borderBottom: "1px solid",
    borderColor: "divider",
};

const Bar = () => (
    <SpaceBetween alignItems="center" sx={BarSx}>
        <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            overflow="auto hidden"
        >
            <Search />
            <UserSelect />
            <Priority />
        </Stack>

        <AddButtons />
    </SpaceBetween>
);

export default Bar;
