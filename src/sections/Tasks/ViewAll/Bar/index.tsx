import Stack from "@mui/material/Stack";
import { SxProps, Theme } from "@mui/material";
import Search from "./Search";
import UserSelect from "./UserSelect";
import { SpaceBetween } from "@/components/styled";
import AddButtons from "./AddButtons";
import Priority from "./Priority";
import ModeButton from "./ModeButton";
import SortBy from "./SortBy";

const BarSx: SxProps<Theme> = {
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
            <SortBy />
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
            <ModeButton />
            <AddButtons />
        </Stack>
    </SpaceBetween>
);

export default Bar;
