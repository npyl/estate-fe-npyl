import useTaskFromProperty from "../Properties/ViewById/(tabs)/Tasks/useTaskFromProperty";
import CreateFromResourceButton from "../Tasks/CreateFromResourceButton";

const PropertyTaskButton = () => {
    const { getTask } = useTaskFromProperty();
    return <CreateFromResourceButton taskGetter={getTask} />;
};

export default PropertyTaskButton;
