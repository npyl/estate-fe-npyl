import FormDialog from "./FormDialog";
import useIdParam from "../useIdParam";

const CreateWatcher = () => {
    const { id } = useIdParam();
    if (!id) return null;
    return <FormDialog id={id} />;
};

export default CreateWatcher;
