import FormDialog from "./FormDialog";
import useIdParam from "./useCreateParam";

const CreateWatcher = () => {
    const { create, goBack } = useIdParam();
    if (!create) return null;
    return <FormDialog onCancel={goBack} />;
};

export default CreateWatcher;
