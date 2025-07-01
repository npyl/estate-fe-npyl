import Chip from "@mui/material/Chip";
import ChipLabel from "@/ui/Filters/ChipLabel";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { useGetPropertyByIdQuery } from "@/services/properties";

interface Props {
    id: number;
}

const PropertyChip: FC<Props> = ({ id }) => {
    const { t } = useTranslation();
    const { data } = useGetPropertyByIdQuery(id);
    return (
        <Chip
            label={<ChipLabel title={t("Property")} value={data?.code || ""} />}
        />
    );
};

export default PropertyChip;
