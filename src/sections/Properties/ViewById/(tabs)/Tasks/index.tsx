import { useGetTasksQuery } from "@/services/properties";
import { useRouter } from "next/router";
import PersonalTasks from "@/sections/Tasks/PersonalTasks";
import Stack from "@mui/material/Stack";
import CreateFromResourceButton from "@/sections/Tasks/CreateFromResourceButton";
import useTaskFromProperty from "./useTaskFromProperty";

const Tasks = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    const { data: cards } = useGetTasksQuery(+propertyId!);

    const { getTask } = useTaskFromProperty();

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
