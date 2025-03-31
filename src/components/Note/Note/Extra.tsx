import HomeIcon from "@/assets/icons/home";
import ChipLink from "@/components/ChipLink";
import { FC } from "react";

interface PropertyLabelProps {
    id: number;
    code: string;
}

const PropertyLabel: FC<PropertyLabelProps> = ({ id, code }) => (
    <ChipLink
        href={`/property/${id}`}
        label={code}
        icon={<HomeIcon fontSize="small" />}
    />
);

export { PropertyLabel };
