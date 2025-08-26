import { Stack } from "@mui/material";
import Information from "./Information";
import useGetCustomer from "@/sections/Customer/hooks/useGetCustomer";
import dynamic from "next/dynamic";
const B2BMembers = dynamic(() => import("./B2BMembers"));

const InformationSection = () => {
    const { customer } = useGetCustomer();
    const { members } = customer || {};
    const hasMembers = members?.length && members?.length > 0;
    return (
        <Stack spacing={1}>
            <Information />
            {hasMembers ? <B2BMembers /> : null}
        </Stack>
    );
};

export default InformationSection;
