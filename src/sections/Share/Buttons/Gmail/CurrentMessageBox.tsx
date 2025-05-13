import { FC } from "react";
import { useRouter } from "next/router";
import { toNumberSafe } from "@/utils/toNumber";
import { useGetCustomerByIdQuery } from "@/services/customers";
import MessageBox from "@/sections/Emails/Send/MessageBox";
import Portal from "@mui/material/Portal";

interface CurrentMessageBoxProps {
    body: string;
    onClose: VoidFunction;
}

const CurrentMessageBox: FC<CurrentMessageBoxProps> = ({ body, onClose }) => {
    const router = useRouter();
    const { propertyId, customerId } = router.query;
    const iPropertyId = toNumberSafe(propertyId);
    const iCustomerId = toNumberSafe(customerId);

    const { data } = useGetCustomerByIdQuery(iCustomerId, {
        skip: iCustomerId === -1,
    });

    const propertyIds = iPropertyId !== -1 ? [iPropertyId] : [];
    const to = data?.email ? [data.email] : [];

    return (
        <MessageBox
            propertyIds={propertyIds}
            to={to}
            body={body}
            onClose={onClose}
        />
    );
};

export default CurrentMessageBox;
