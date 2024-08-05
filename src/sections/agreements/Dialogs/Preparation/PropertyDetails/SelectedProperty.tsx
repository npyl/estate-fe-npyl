import { useGetPropertyByIdQuery } from "@/services/properties";
import Skeleton from "@mui/material/Skeleton";
import { useFormContext } from "react-hook-form";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const useSelectedProperty = () => {
    const { watch } = useFormContext();
    const propertyId = watch("propertyId");

    const { data: property, isLoading } = useGetPropertyByIdQuery(
        +propertyId!,
        {
            skip: !propertyId || propertyId === -1,
        }
    );

    return { property, isLoading };
};

// ----------------------------------------------------------------------

const SelectedProperty = () => {
    const { t } = useTranslation();
    const { property, isLoading } = useSelectedProperty();

    if (!property) return null;

    if (isLoading)
        return <Skeleton width="100%" height={40} animation="pulse" />;

    return (
        <Typography>
            {t("Selected Property")}: {property?.code}
        </Typography>
    );
};

export default SelectedProperty;
