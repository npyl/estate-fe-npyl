import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useGetCustomerByIdQuery } from "@/services/customers";
import dynamic from "next/dynamic";
const DemandSection = dynamic(() => import("../sections/Demand"));

const DemandsTab = () => {
    const router = useRouter();
    const { customerId } = router.query;
    const { data } = useGetCustomerByIdQuery(+customerId!);

    const demands = data?.demands;

    return (
        <Stack spacing={1}>
            {demands?.map((d, i) => (
                <DemandSection key={i} demand={d} index={i} />
            ))}
        </Stack>
    );
};

export default DemandsTab;
