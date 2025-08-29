import ViewAll from "@/sections/Logs/ViewAll";
import toNumberSafe from "@/utils/toNumberSafe";
import { useRouter } from "next/router";

const Logs = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    const iPropertyId = toNumberSafe(propertyId);
    if (iPropertyId === -1) return null;

    return <ViewAll propertyId={iPropertyId} />;
};

export default Logs;
