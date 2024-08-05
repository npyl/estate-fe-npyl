import { useRouter } from "next/router";
import CustomerFiller from "./CustomerFiller";
import PropertyFiller from "./PropertyFiller";
import RHFPropertySearch from "./RHFSearch";

const Autofiller = () => {
    const router = useRouter();
    const { propertyId, customerId } = router.query;

    return (
        <>
            {/* /property/[propertyId] & CREATE case */}
            {propertyId ? <PropertyFiller /> : null}

            {/* /customer/[customerId] & CREATE case */}
            {customerId ? <CustomerFiller /> : null}

            {/* Property Search: /agreements & CREATE case */}
            {!propertyId && !customerId ? <RHFPropertySearch /> : null}
        </>
    );
};

export default Autofiller;
