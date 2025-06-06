import { useGetCustomerByIdQuery } from "@/services/customers";
import { FC, SVGProps } from "react";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import CustomersEditIcon from "@/assets/icons/customers-edit";

interface IconProps extends SVGProps<SVGSVGElement> {
    resourceId?: number;
}

const EditIcon: FC<IconProps> = ({ resourceId }) => {
    const { data } = useGetCustomerByIdQuery(resourceId!, {
        skip: !Boolean(resourceId),
    });

    const isB2B = Boolean(data?.b2b);

    return isB2B ? <CorporateFareIcon /> : <CustomersEditIcon />;
};

export default EditIcon;
