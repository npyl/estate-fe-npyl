import { useRouter } from "next/router";
import Pusher from "@/sections/Pusher";
import { ITab } from "@/types/tabs";

const getTab = (propertyId: number): ITab => ({
    path: `/property/${propertyId}`,
    renderer: "PROPERTY_VIEW",
    resourceId: propertyId,
});

const PropertyPusher = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    return <Pusher tab={getTab(+propertyId!)} />;
};

export default PropertyPusher;
