import { useGetPropertyByIdQuery } from "@/services/properties";
import Skeleton from "@mui/material/Skeleton";
import { useFormContext } from "react-hook-form";
import Typography from "@mui/material/Typography";

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

const SelectedProperty = () => {
    const { property, isLoading } = useSelectedProperty();

    if (!property) return null;

    if (isLoading)
        return <Skeleton width="100%" height={40} animation="pulse" />;

    return <Typography>Property: {property?.code}</Typography>;
};

export default SelectedProperty;
