import PPOpener, { useOpener } from "@/components/Opener";
import dynamic from "next/dynamic";
import AddButton from "./AddButton";
const AddDialog = dynamic(() => import("./AddDialog"));

const AddOpener = () => {
    const [openerRef, onClick] = useOpener();

    return (
        <PPOpener
            ref={openerRef}
            Clicker={AddButton}
            Component={AddDialog}
            onClick={onClick}
        />
    );
};

export default AddOpener;
