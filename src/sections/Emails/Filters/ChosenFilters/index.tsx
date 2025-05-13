import { useIds } from "@/sections/Emails/Filters/Context";
import Stack from "@mui/material/Stack";
import getChip from "./getChip";
import { useRouter } from "next/router";
import PropertyChip from "./PropertyChip";
import CustomerChip from "./CustomerChip";

const ChosenFilters = () => {
    const router = useRouter();
    const { propertyId, customerId } = router.query;
    const isProperty = Boolean(propertyId);
    const isCustomer = Boolean(customerId);

    const ids = useIds();

    return (
        <Stack direction="row" spacing={1} flexWrap="wrap">
            {/* Immutable */}
            {isProperty ? <PropertyChip id={+propertyId!} /> : null}
            {isCustomer ? <CustomerChip id={+customerId!} /> : null}
            {/* Mutable */}
            {ids.map(getChip)}
        </Stack>
    );
};

export default ChosenFilters;
