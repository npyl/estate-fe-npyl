import Card from "@/sections/Tasks/card";
import { IKanbanCardShort } from "@/types/tasks";
import Container from "@mui/material/Container";
import { SxProps, Theme } from "@mui/material";
import { FC } from "react";
import Link from "@/components/Link";

// -------------------------------------------------------------------

const CardSx: SxProps<Theme> = {
    ".TaskCard-HeaderControls": {
        display: "none",
    },

    "&:hover": {
        boxShadow: 20,
        cursor: "pointer",
    },
};

// -------------------------------------------------------------------

const getCard = (c: IKanbanCardShort) => (
    <Link href={`/tasks?taskId=${c.id}`}>
        <Card key={c.id} card={c} sx={CardSx} />
    </Link>
);

// -------------------------------------------------------------------

interface TasksProps {
    cards: IKanbanCardShort[];
}

const PersonalTasks: FC<TasksProps> = ({ cards }) => (
    <Container maxWidth="md">{cards?.map(getCard)}</Container>
);

export default PersonalTasks;
