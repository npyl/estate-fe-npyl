import { useLazyGetCustomerByIdQuery } from "@/services/customers";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import useCustomerAutofill from "./hook";

const CustomerFiller = () => {
    const { setValue } = useFormContext();

    const router = useRouter();
    const { customerId } = router.query;

    const [getCustomer] = useLazyGetCustomerByIdQuery();
    const autofill = useCustomerAutofill(setValue);

    // NOTE: make sure we setValue() AFTER the ui has loaded to prevent not-showing change
    useEffect(() => {
        getCustomer(+customerId!).unwrap().then(autofill);
    }, [autofill]);

    return null;
};

export default CustomerFiller;
