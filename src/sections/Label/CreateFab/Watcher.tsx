import FormDialog from "../FormDialog";
import useIdParam from "../useCreateParam";

const CreateWatcher = () => {
    const create = useIdParam();
    if (!create) return null;
    return <FormDialog />;
};

export default CreateWatcher;
