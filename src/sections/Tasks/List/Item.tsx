import { IKanbanCardShort } from "@/types/tasks";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { SpaceBetween } from "@/components/styled";
import TaskLabel from "@/sections/Tasks/card/CardDialog/TaskLabel";
import TooltipAvatar from "@/components/Avatar/Group/TooltipAvatar";
import { SxProps, Theme } from "@mui/material";

const ColumnPicker = () => null;

const NoAssignee = () => null;

const ItemSx: SxProps<Theme> = {
    cursor: "pointer",

    ":not(last-of-type)": {
        borderBottom: 0,
    },

    "&:hover": {
        backgroundColor: ({ palette: { mode, neutral } }) =>
            mode === "light" ? neutral?.[200] : neutral?.[800],
    },
};

const getSx = (isCompleted: boolean): SxProps<Theme> => ({
    textDecoration: isCompleted ? "line-through" : "none",
});

interface ItemProps {
    c: IKanbanCardShort;
}

const Item: FC<ItemProps> = ({ c }) => {
    const assignee = c.assignees?.[0];
    const isCompleted = c.completed;

    return (
        <SpaceBetween
            p={1}
            bgcolor="background.paper"
            border="1px solid"
            borderColor="divider"
            alignItems="center"
            sx={ItemSx}
        >
            <Stack direction="row" spacing={1} alignItems="center">
                <TaskLabel taskCode={c?.uniqueCode} sx={getSx(isCompleted)} />
                <Typography variant="body2">{c.name}</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
                <ColumnPicker />
                {assignee ? <TooltipAvatar u={assignee} /> : <NoAssignee />}
            </Stack>
        </SpaceBetween>
    );
};

export default Item;
