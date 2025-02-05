import { useRouter } from "next/router";
import Pusher from "@/sections/Pusher";
import { ITab } from "@/types/tabs";

const getTab = (agreementId: number): ITab => ({
    path: `/agreements/${agreementId}`,
    renderer: "AGREEMENT",
    resourceId: agreementId,
});

const AgreementPusher = () => {
    const router = useRouter();
    const { agreementId } = router.query;
    return <Pusher tab={getTab(+agreementId!)} />;
};

export default AgreementPusher;
