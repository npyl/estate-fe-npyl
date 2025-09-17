import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { FC } from "react";
import CreateFab from "@/ui/CreateFab";
import { TASK } from "@/constants/tests";
const CardDialog = dynamic(() => import("@/sections/Tasks/card/CardDialog"));

interface CreateTaskButtonProps {
    create: boolean;
}

const CreateTaskButton: FC<CreateTaskButtonProps> = ({ create }) => {
    const [isDialogOpen, openDialog, closeDialog] = useDialog(create);
    return (
        <>
            <CreateFab data-testid={TASK.CREATE_ID} onClick={openDialog} />
            {isDialogOpen ? <CardDialog onClose={closeDialog} /> : null}
        </>
    );
};

export default CreateTaskButton;
