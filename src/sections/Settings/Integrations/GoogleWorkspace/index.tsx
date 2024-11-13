import useDialog from "@/hooks/useDialog";
import Item from "./Item";
import dynamic from "next/dynamic";
const EditDialog = dynamic(() => import("./EditDialog"));

const GoogleWorkspace = () => {
    const [isOpen, openEdit, closeEdit] = useDialog();

    return (
        <>
            <Item onEdit={openEdit} />
            {isOpen ? <EditDialog onClose={closeEdit} /> : null}
        </>
    );
};

export default GoogleWorkspace;
