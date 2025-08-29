import ViewAll from "@/sections/Emails";
import toNumberSafe from "@/utils/toNumberSafe";
import { useRouter } from "next/router";

const Emails = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    const iPropertyId = toNumberSafe(propertyId);
    if (iPropertyId === -1) return null;

    return <ViewAll propertyId={iPropertyId} />;
};

export default Emails;
