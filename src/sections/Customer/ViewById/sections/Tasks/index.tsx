import PersonalTasks from "@/sections/Tasks/PersonalTasks";
import { useGetTasksQuery } from "@/services/customers";
import { useRouter } from "next/router";

const Tasks = () => {
    const router = useRouter();
    const { customerId } = router.query;
    const { data } = useGetTasksQuery(+customerId!);
    return <PersonalTasks cards={data ?? []} />;
};

export default Tasks;
