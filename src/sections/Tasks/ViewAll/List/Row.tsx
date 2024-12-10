import { IKanbanColumn } from "@/types/tasks";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { SxProps, Theme } from "@mui/material";
import Items from "./Items";
import DoneIcon from "@mui/icons-material/Done";

interface HeaderProps {
    name: string;
    done: boolean;
}

const Header: FC<HeaderProps> = ({ name, done }) => (
    <Stack direction="row" spacing={1} alignItems="center">
        <Typography p={1} variant="body2" fontWeight="bold">
            {name}
        </Typography>

        {done ? <DoneIcon color="success" /> : null}
    </Stack>
);

const RowSx: SxProps<Theme> = {
    backgroundColor: ({ palette: { mode, neutral } }) =>
        mode === "light" ? "background.neutral" : neutral?.[900],
};

interface RowProps {
    c: IKanbanColumn;
}

const Row: FC<RowProps> = ({ c }) => (
    <Stack width={1} borderRadius="5px" sx={RowSx}>
        <Header name={c.name} done={c.done} />
        <Items ids={c.cardIds} columnId={c.id} px={1} pb={1} />
    </Stack>
);

export default Row;
