import Agreements from "@/sections/agreements";
import { useRouter } from "next/router";

const AgreementsTab = () => {
    const router = useRouter();
    const { customerId } = router.query;
    return <Agreements customerId={+customerId!} />;
};

export default AgreementsTab;
