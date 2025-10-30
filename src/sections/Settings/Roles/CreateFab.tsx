import PPCreateFab from "@/ui/CreateFab";
import CreateOrEdit from "./CreateOrEdit";
import useDialog from "@/hooks/useDialog";

const CreateFab = () => {
    const [isOpen, open, close] = useDialog();

    return (
        <>
            <PPCreateFab onClick={open} />
            {isOpen ? <CreateOrEdit onCancel={close} /> : null}
        </>
    );
};

export default CreateFab;
