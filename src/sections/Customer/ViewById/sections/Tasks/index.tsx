import { useGetTasksQuery } from "@/services/customers";
import { useRouter } from "next/router";
import PersonalTasks from "@/sections/Tasks/PersonalTasks";

const Tasks = () => {
    const router = useRouter();
    const { customerId } = router.query;
    const { data: cards } = useGetTasksQuery(+customerId!);

    return <PersonalTasks cards={cards || []} />;
};

export default Tasks;
