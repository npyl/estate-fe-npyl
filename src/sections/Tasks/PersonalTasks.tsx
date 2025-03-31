import Card from "@/sections/Tasks/ViewAll/List/Item";
import { IKanbanCardShort } from "@/types/tasks";
import { FC } from "react";

// -------------------------------------------------------------------

const getCard = (c: IKanbanCardShort) => <Card key={c.id} c={c} />;

// -------------------------------------------------------------------

interface TasksProps {
    cards: IKanbanCardShort[];
}

const PersonalTasks: FC<TasksProps> = ({ cards }) => <>{cards?.map(getCard)}</>;

export default PersonalTasks;
