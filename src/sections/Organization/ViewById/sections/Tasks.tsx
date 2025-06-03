import useOrganization from "@/sections/Organization/useOrganization";
import PersonalTasks from "@/sections/Tasks/PersonalTasks";

const Tasks = () => {
    const { data } = useOrganization();
    return <PersonalTasks cards={data?.tasks ?? []} />;
};

export default Tasks;
