import HomeIcon from "@/assets/icons/home";
import ChipLink from "@/components/ChipLink";
import { FC } from "react";

const PROPERTY_CHIP_CLASSNAME = "PPNote-PropertyLabelChip";

interface PropertyLabelProps {
    id: number;
    code: string;
}

const PropertyLabel: FC<PropertyLabelProps> = ({ id, code }) => (
    <ChipLink
        className={PROPERTY_CHIP_CLASSNAME}
        href={`/property/${id}`}
        label={code}
        icon={<HomeIcon fontSize="small" />}
        sx={{
            ml: "40px",
            my: 1,
        }}
    />
);

export { PROPERTY_CHIP_CLASSNAME, PropertyLabel };
