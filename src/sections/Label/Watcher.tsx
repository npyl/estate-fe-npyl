import CreateDialog from "@/sections/Label/Create/Dialog";
import useIdParam from "./useCreateParam";

const CreateWatcher = () => {
    const { create, goBack } = useIdParam();
    if (!create) return null;
    return <CreateDialog onCancel={goBack} />;
};

export default CreateWatcher;
