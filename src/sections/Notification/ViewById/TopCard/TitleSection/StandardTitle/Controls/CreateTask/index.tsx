import CreateFromResourceButton from "@/sections/Tasks/CreateFromResourceButton";
import useNotificationTask from "./useNotificationTask";

const CreateTaskButton = () => {
    const { getter } = useNotificationTask();
    return <CreateFromResourceButton taskGetter={getter} />;
};

export default CreateTaskButton;
