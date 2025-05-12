import CodeMultiple from "@/sections/_Autocompletes/CodeMultiple";
import { SxProps, Theme } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const Sx: SxProps<Theme> = {
    minWidth: "100px",
};

interface PropertyIdsPickerProps {
    propertyIds: number[];
    onChange: (ids: number[]) => void;
}

const PropertyIdsPicker: FC<PropertyIdsPickerProps> = ({
    propertyIds,
    onChange,
}) => {
    const { t } = useTranslation();
    return (
        <CodeMultiple
            label={t<string>("Properties")}
            idValue={propertyIds}
            onChange={(_, ids) => onChange(ids)}
            inputSx={Sx}
        />
    );
};

export default PropertyIdsPicker;
