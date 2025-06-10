import dynamic from "next/dynamic";
import useDialog from "@/hooks/useDialog";
import CreateFab from "@/ui/CreateFab";

const PreparationDialog = dynamic(
    () => import("@/sections/agreements/Dialogs/Preparation")
);

const CreateButton = () => {
    const [isOpen, openDialog, closeDialog] = useDialog();

    return (
        <>
            <CreateFab onClick={openDialog} />
            {isOpen ? <PreparationDialog onClose={closeDialog} /> : null}
        </>
    );
};

export default CreateButton;
