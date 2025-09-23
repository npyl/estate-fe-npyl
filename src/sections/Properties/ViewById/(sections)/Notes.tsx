import { useRouter } from "next/router";
import PanelWithQuickView from "../PanelWithQuickView";
import NoteSection from "@/ui/Note/Section";

const NotesSection: React.FC = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    if (!propertyId) return null;

    return (
        <PanelWithQuickView hideHeader label="NotesSection">
            <NoteSection resource="property" resourceId={+propertyId!} />
        </PanelWithQuickView>
    );
};

export default NotesSection;
