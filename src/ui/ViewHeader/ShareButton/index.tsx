import { useRouter } from "next/router";
import PropertyShareButton from "./Property";
import toNumberSafe from "@/utils/toNumberSafe";
import CustomerShareButton from "./Customer";

const ShareButton = () => {
    const router = useRouter();
    const { customerId, propertyId } = router.query;

    const iPropertyId = toNumberSafe(propertyId);
    const iCustomerId = toNumberSafe(customerId);

    const isProperty = iPropertyId !== -1;
    const isCustomer = iCustomerId !== -1;

    return (
        <>
            {isProperty ? (
                <PropertyShareButton propertyId={iPropertyId} />
            ) : null}
            {isCustomer ? <CustomerShareButton /> : null}
        </>
    );
};

export default ShareButton;
