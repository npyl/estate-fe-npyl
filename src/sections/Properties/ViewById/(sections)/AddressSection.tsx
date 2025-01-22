import { useRouter } from "next/router";
import * as React from "react";
import { ViewLocation } from "src/components/Location/View";
import { useGetPropertyByIdQuery } from "src/services/properties";
import PanelWithQuickView from "../PanelWithQuickView";

const AddressSection: React.FC = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    const { data } = useGetPropertyByIdQuery(+propertyId!);
    const location = data?.location;

    if (!location) return null;

    return (
        <PanelWithQuickView label={AddressSection.name}>
            <ViewLocation location={location} />
        </PanelWithQuickView>
    );
};

export default AddressSection;
