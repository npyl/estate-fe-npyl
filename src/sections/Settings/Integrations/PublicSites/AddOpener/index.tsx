import PPOpener, { useOpener } from "@/components/Opener";
import dynamic from "next/dynamic";
import AddButton from "./AddButton";
const AddDrawer = dynamic(() => import("./AddDrawer"));

const AddOpener = () => {
    const [openerRef, onClick] = useOpener();

    return (
        <PPOpener
            ref={openerRef}
            Clicker={AddButton}
            Component={AddDrawer}
            onClick={onClick}
        />
    );
};

export default AddOpener;
