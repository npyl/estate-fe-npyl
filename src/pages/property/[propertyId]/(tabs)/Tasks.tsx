import { useGetTasksQuery } from "@/services/properties";
import { useRouter } from "next/router";
import PersonalTasks from "@/sections/Tasks/PersonalTasks";

const Tasks = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    const { data: cards } = useGetTasksQuery(+propertyId!);
    return <PersonalTasks cards={cards || []} />;
};

export default Tasks;
