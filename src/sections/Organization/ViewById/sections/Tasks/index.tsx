import PersonalTasks from "@/sections/Tasks/PersonalTasks";
import { IKanbanCardShort } from "@/types/tasks";

interface TasksProps {
    cards: IKanbanCardShort[];
}
const Tasks = ({ cards }: TasksProps) => {
    return <PersonalTasks cards={cards} />;
};

export default Tasks;
