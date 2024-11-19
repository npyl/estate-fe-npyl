import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import Item from "./Item";
const EditDialog = dynamic(() => import("./EditDialog"));

const RightMoveItem = () => {
    const [isOpen, openDialog, closeDialog] = useDialog();
    return (
        <>
            <Item onEdit={openDialog} />
            {isOpen ? <EditDialog onClose={closeDialog} /> : null}
        </>
    );
};

export default RightMoveItem;
