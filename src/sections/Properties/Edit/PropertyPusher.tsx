import { useRouter } from "next/router";
import Pusher from "@/sections/Pusher";
import { ITab } from "@/types/tabs";
import { useGetPropertyByIdQuery } from "@/services/properties";
import { toNumberSafe } from "@/utils/toNumber";

const getTab = (resourceId: number, isFirstEdit: boolean): ITab => ({
    path: `/property/edit/${resourceId}`,
    renderer: isFirstEdit ? "PROPERTY_CREATE" : "PROPERTY_EDIT",
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

    const isFirstEdit = createdAt?.toString() === updatedAt?.toString();

    if (iPropertyId === -1) return null;

    return <Pusher tab={getTab(iPropertyId, isFirstEdit)} />;
};

export default PropertyPusher;
