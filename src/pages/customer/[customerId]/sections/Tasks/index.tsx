import { useGetTasksQuery } from "@/services/customers";
import { useRouter } from "next/router";
import PersonalTasks from "@/sections/Tasks/PersonalTasks";
import Stack from "@mui/material/Stack";
import CreateFromResourceButton from "@/sections/Tasks/CreateFromResourceButton";
import useTaskFromCustomer from "./useTaskFromCustomer";

const Tasks = () => {
    const router = useRouter();
    const { customerId } = router.query;
    const { data: cards } = useGetTasksQuery(+customerId!);

    const { getTask } = useTaskFromCustomer();

    return (
        <>
            <Stack alignItems="flex-end" width={1}>
                <CreateFromResourceButton taskGetter={getTask} />
            </Stack>

            <PersonalTasks cards={cards || []} />
        </>
    );
};

export default Tasks;
