import AgreementsSection from "@/sections/agreements";
import { useRouter } from "next/router";

const AgreementsTab = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    return <AgreementsSection propertyId={+propertyId!} />;
};

export default AgreementsTab;
