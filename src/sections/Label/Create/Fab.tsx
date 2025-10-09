import PPCreateFab from "@/ui/CreateFab";
import useDialog from "@/hooks/useDialog";
import CreateDialog from "./Dialog";

const CreateFab = () => {
    const [isOpen, open, close] = useDialog();
    return (
        <>
            <PPCreateFab onClick={open} />
            {isOpen ? <CreateDialog onCancel={close} /> : null}
        </>
    );
};

export default CreateFab;
