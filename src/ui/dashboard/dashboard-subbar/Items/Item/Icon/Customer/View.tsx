import CustomersIcon from "@/assets/icons/customers";
import { useGetCustomerByIdQuery } from "@/services/customers";
import { FC, SVGProps } from "react";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

interface IconProps extends SVGProps<SVGSVGElement> {
    resourceId?: number;
}

const ViewIcon: FC<IconProps> = ({ resourceId }) => {
    const { data } = useGetCustomerByIdQuery(resourceId!, {
        skip: !Boolean(resourceId),
    });

    const isB2B = Boolean(data?.b2b);

    return isB2B ? <CorporateFareIcon /> : <CustomersIcon />;
};

export default ViewIcon;
