import ViewAll from "@/sections/Emails";
import { toNumberSafe } from "@/utils/toNumber";
import { useRouter } from "next/router";

const Emails = () => {
    const router = useRouter();
    const { customerId } = router.query;
    const iCustomerId = toNumberSafe(customerId);
    if (iCustomerId === -1) return null;

    return <ViewAll customerId={iCustomerId} />;
};

export default Emails;
