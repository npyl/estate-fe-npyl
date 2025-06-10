import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import CreateFab from "@/ui/CreateFab";
const MessageBox = dynamic(() => import("./MessageBox"));

const Send = () => {
    const [isOpen, openBox, closeBox] = useDialog();
    const {
        people,
        peopleFreeSoloed,
        filters: { propertyIds },
    } = useFiltersContext();

    return (
        <>
            <CreateFab onClick={openBox} />

            {isOpen ? (
                <MessageBox
                    to={people}
                    toFreeSoloed={peopleFreeSoloed}
                    propertyIds={propertyIds}
                    onClose={closeBox}
                />
            ) : null}
        </>
    );
};

export default Send;
