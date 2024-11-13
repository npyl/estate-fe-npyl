import useDialog from "@/hooks/useDialog";
import IntegrationItem from "../Item";
import dynamic from "next/dynamic";
const EditDialog = dynamic(() => import("./EditDialog"));

const RightMoveItem = () => {
    const [isOpen, openDialog, closeDialog] = useDialog();
    return (
        <>
            <IntegrationItem
                type="RIGHT_MOVE"
                expandedInitialy={false}
                onEdit={openDialog}
            />

            {isOpen ? <EditDialog onClose={closeDialog} /> : null}
        </>
    );
};

export default RightMoveItem;
