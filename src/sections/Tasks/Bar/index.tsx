import Stack from "@mui/material/Stack";
import { SxProps, Theme } from "@mui/material";
import Search from "./Search";
import UserSelect from "./UserSelect";
import { SpaceBetween } from "@/components/styled";
import AddButtons from "./AddButtons";
import Priority from "./Priority";
import { FC } from "react";
import { TMode } from "../types";
import ModeButton from "./ModeButton";

const BarSx: SxProps<Theme> = {
    bgcolor: "background.default",
    zIndex: 50,
    borderRadius: "10px",
    p: 1,
    borderBottom: "1px solid",
    borderColor: "divider",
};

interface BarProps {
    mode: TMode;
    onToggleMode: VoidFunction;
}

const Bar: FC<BarProps> = ({ mode, onToggleMode }) => (
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

        <Stack direction="row" spacing={1} alignItems="center">
            <ModeButton mode={mode} onClick={onToggleMode} />
            <AddButtons />
        </Stack>
    </SpaceBetween>
);

export default Bar;
