import useGetCustomer from "@/hooks/customer";
import Stack from "@mui/material/Stack";

const B2BMembers = () => {
    const { customer } = useGetCustomer();
    const { members } = customer || {};
    return <Stack>{members?.map(({ email }) => email)}</Stack>;
};

export default B2BMembers;
