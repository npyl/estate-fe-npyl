import { FC, SVGProps } from "react";
import HomeEditIcon from "@/assets/icons/home-edit";
import HomeCreateIcon from "@/assets/icons/home-create";
import { useGetPropertyByIdQuery } from "@/services/properties";

interface PropertyCreateEditIconProps extends SVGProps<SVGSVGElement> {
    resourceId?: number;
}

const PropertyEditIcon: FC<PropertyCreateEditIconProps> = ({
    resourceId,
    ...props
}) => {
    const { data } = useGetPropertyByIdQuery(resourceId!, {
        skip: !Boolean(resourceId),
    });

    const { createdAt, updatedAt } = data || {};
    const isFirstEdit = createdAt?.toString() === updatedAt?.toString();

    return isFirstEdit ? (
        <HomeCreateIcon {...props} />
    ) : (
        <HomeEditIcon {...props} />
    );
};

export default PropertyEditIcon;
