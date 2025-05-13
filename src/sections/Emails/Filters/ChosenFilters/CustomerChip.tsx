import Chip from "@mui/material/Chip";
import ChipLabel from "@/sections/Filters/ChipLabel";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { useGetCustomerByIdQuery } from "@/services/customers";

interface Props {
    id: number;
}

const CustomerChip: FC<Props> = ({ id }) => {
    const { t } = useTranslation();
    const { data } = useGetCustomerByIdQuery(id);

    const fullname = `${data?.firstName || ""} ${data?.lastName || ""}`;

    return <Chip label={<ChipLabel title={t("To")} value={fullname} />} />;
};

export default CustomerChip;
