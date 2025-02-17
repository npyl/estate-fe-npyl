import Card from "@/sections/Tasks/ViewAll/List/Item";
import { IKanbanCardShort } from "@/types/tasks";
import { FC } from "react";
import Link from "@/components/Link";

// -------------------------------------------------------------------

const getCard = (c: IKanbanCardShort) => (
    <Link href={`/tasks?taskId=${c.id}`}>
        <Card key={c.id} c={c} onClick={() => {}} />
    </Link>
);

// -------------------------------------------------------------------

interface TasksProps {
    cards: IKanbanCardShort[];
}

const PersonalTasks: FC<TasksProps> = ({ cards }) => <>{cards?.map(getCard)}</>;

export default PersonalTasks;
