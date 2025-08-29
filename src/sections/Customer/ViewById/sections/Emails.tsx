import ViewAll from "@/sections/Emails";
import { useGetCustomerByIdQuery } from "@/services/customers";
import toNumberSafe from "@/utils/toNumberSafe";
import { useRouter } from "next/router";

const Emails = () => {
    const router = useRouter();
    const { customerId } = router.query;
    const iCustomerId = toNumberSafe(customerId);
    if (iCustomerId === -1) return null;

    const { data } = useGetCustomerByIdQuery(iCustomerId);
    const to = data?.email;

    return <ViewAll to={to} />;
};

export default Emails;
