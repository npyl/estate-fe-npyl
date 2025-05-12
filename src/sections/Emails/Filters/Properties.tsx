import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import { useRouter } from "next/router";
import PropertyIdsPicker from "../Pickers/PropertyIds";

const PropertyFilter = () => {
    const { filters, setPropertyIds } = useFiltersContext();
    const { propertyIds } = filters;

    // INFO: prevent picker on property view
    const router = useRouter();
    const { propertyId } = router.query;
    if (Boolean(propertyId)) return null;

    return (
        <PropertyIdsPicker
            propertyIds={propertyIds}
            onChange={setPropertyIds}
        />
    );
};

export default PropertyFilter;
