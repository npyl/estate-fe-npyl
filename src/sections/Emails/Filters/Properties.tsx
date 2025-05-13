import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import PropertyIdsPicker from "../Pickers/PropertyIds";

const PropertyFilter = () => {
    const { filters, setPropertyIds } = useFiltersContext();
    const { propertyIds } = filters;

    return (
        <PropertyIdsPicker
            propertyIds={propertyIds}
            onChange={setPropertyIds}
        />
    );
};

export default PropertyFilter;
