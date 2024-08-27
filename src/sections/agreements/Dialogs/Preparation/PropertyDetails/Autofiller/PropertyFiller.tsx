import { useEffect } from "react";
import { useLazyGetPropertyByIdQuery } from "@/services/properties";
import { useRouter } from "next/router";
import useAutofill from "./hook";

const PropertyFiller = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const [getProperty] = useLazyGetPropertyByIdQuery();
    const { autofill } = useAutofill();

    // NOTE: make sure we setValue() AFTER the ui has loaded to prevent not-showing change
    useEffect(() => {
        getProperty(+propertyId!).unwrap().then(autofill);
    }, [autofill]);

    return null;
};

export default PropertyFiller;
