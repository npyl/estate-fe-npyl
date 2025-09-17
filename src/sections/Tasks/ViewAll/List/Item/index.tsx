import { IKanbanCardShort } from "@/types/tasks";
import { FC } from "react";
import { SxProps, Theme } from "@mui/material";
import { getTaskColor } from "@/sections/Tasks/styled";
import { IDashboardTask } from "@/types/dashboard";
import Link from "@/components/Link";
import Content, { ContentProps } from "./Content";
import Optional from "@/types/Optional";

const getItemSx = (priority: number): SxProps<Theme> => ({
    p: 1,

    display: "flex",
    flexDirection: "column",

    bgcolor: "background.paper",
    position: "relative",
    cursor: "pointer",
    // ...
    border: "1px solid",
    borderLeft: "3px solid",
    borderColor: "divider",
    borderLeftColor: getTaskColor(priority),
    borderRadius: "2px",
    ":not(last-of-type)": {
        borderBottom: 0,
    },
    "&:hover": {
        backgroundColor: ({ palette: { mode, neutral } }) =>
            mode === "light" ? neutral?.[200] : neutral?.[800],
    },
});

interface ItemProps extends Optional<ContentProps, "assignee" | "reporter"> {}

const Item: FC<ItemProps> = ({ c, assignee = true, reporter = false }) => (
    <Link sx={getItemSx(c.priority)} href={`/tasks/${c.id}`}>
        <Content c={c} assignee={assignee} reporter={reporter} />
    </Link>
);

export default Item;
