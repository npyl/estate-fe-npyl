import { IKanbanColumn } from "@/types/tasks";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { SxProps, Theme } from "@mui/material";
import Items from "./Items";

interface HeaderProps {
    name: string;
}

const Header: FC<HeaderProps> = ({ name }) => (
    <Typography p={1} variant="body2" fontWeight="bold">
        {name}
    </Typography>
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
        <Header name={c.name} />
        <Items ids={c.cardIds} columnId={c.id} px={1} pb={1} />
    </Stack>
);

export default Row;
