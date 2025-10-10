import useTaskFromCustomer from "@/sections/Customer/ViewById/sections/Tasks/useTaskFromCustomer";
import CreateFromResourceButton from "../../sections/Tasks/CreateFromResourceButton";

const CustomerTaskButton = () => {
    const { getTask } = useTaskFromCustomer();
    return <CreateFromResourceButton taskGetter={getTask} />;
};

export default CustomerTaskButton;
