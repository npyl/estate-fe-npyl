import NoteSection from "@/ui/Note/Section";
import { useRouter } from "next/router";

const Notes = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    if (!propertyId) return null;
    return <NoteSection chip resource="property" resourceId={+propertyId!} />;
};

export default Notes;
