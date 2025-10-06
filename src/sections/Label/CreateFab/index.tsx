import PPCreateFab from "@/ui/CreateFab";
import useDialog from "@/hooks/useDialog";
import FormDialog from "../FormDialog";

const CreateFab = () => {
    const [isOpen, open, close] = useDialog();
    return (
        <>
            <PPCreateFab onClick={open} />
            {isOpen ? <FormDialog onCancel={close} /> : null}
        </>
    );
};

export default CreateFab;
