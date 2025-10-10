import useTaskFromProperty from "../../sections/Properties/ViewById/(tabs)/Tasks/useTaskFromProperty";
import CreateFromResourceButton from "../../sections/Tasks/CreateFromResourceButton";

const PropertyTaskButton = () => {
    const { getTask } = useTaskFromProperty();
    return <CreateFromResourceButton taskGetter={getTask} />;
};

export default PropertyTaskButton;
