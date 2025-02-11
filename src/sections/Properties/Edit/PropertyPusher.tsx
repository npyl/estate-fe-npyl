import { useRouter } from "next/router";
import Pusher from "@/sections/Pusher";
import { ITab } from "@/types/tabs";
import { useGetPropertyByIdQuery } from "@/services/properties";
import { toNumberSafe } from "@/utils/toNumber";

const getTab = (resourceId: number, isEdit: boolean): ITab => ({
    path: `/property/edit/${resourceId}`,
    renderer: isEdit ? "PROPERTY_EDIT" : "PROPERTY_CREATE",
    resourceId,
});

const PropertyPusher = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    const iPropertyId = toNumberSafe(propertyId);

    const { data } = useGetPropertyByIdQuery(iPropertyId, {
        skip: iPropertyId === -1,
    });
    const { createdAt, updatedAt } = data || {};
    const isEdit = createdAt !== updatedAt;

    if (iPropertyId === -1) return null;

    return <Pusher tab={getTab(iPropertyId, isEdit)} />;
};

export default PropertyPusher;
