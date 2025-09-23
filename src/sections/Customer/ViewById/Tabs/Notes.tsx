import NoteSection from "@/ui/Note/Section";
import { useRouter } from "next/router";

const Notes = () => {
    const router = useRouter();
    const { customerId } = router.query;
    if (!customerId) return null;
    return <NoteSection chip resource="customer" resourceId={+customerId!} />;
};

export default Notes;
