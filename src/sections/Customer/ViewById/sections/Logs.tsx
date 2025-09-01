import ViewAll from "@/sections/Logs/ViewAll";
import toNumberSafe from "@/utils/toNumberSafe";
import { useRouter } from "next/router";

const Logs = () => {
    const router = useRouter();
    const { customerId } = router.query;
    const iCustomerId = toNumberSafe(customerId);
    if (iCustomerId === -1) return null;

    return <ViewAll customerId={iCustomerId} />;
};

export default Logs;
