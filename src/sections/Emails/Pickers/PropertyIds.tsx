import CodeMultiple, {
    getTagClassname,
} from "@/sections/_Autocompletes/CodeMultiple";
import { toNumberSafe } from "@/utils/toNumber";
import { SxProps, Theme } from "@mui/material";
import { useRouter } from "next/router";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const getSx = (propertyId: number): SxProps<Theme> => ({
    minWidth: "100px",

    // INFO: disable ability to delete tag chip that corresponds to current property (e.g. when opening Emails from tab from PropertyById)
    [`.${getTagClassname(propertyId)}`]: {
        ".MuiChip-deleteIcon": {
            display: "none",
        },
    },
});

interface PropertyIdsPickerProps {
    propertyIds: number[];
    onChange: (ids: number[]) => void;
}

const PropertyIdsPicker: FC<PropertyIdsPickerProps> = ({
    propertyIds,
    onChange,
}) => {
    const { t } = useTranslation();

    const router = useRouter();
    const { propertyId } = router.query;
    const currentPropertyId = toNumberSafe(propertyId);

    return (
        <CodeMultiple
            label={t<string>("Properties")}
            idValue={propertyIds}
            onChange={(_, ids) => onChange(ids)}
            inputSx={getSx(currentPropertyId)}
        />
    );
};

export default PropertyIdsPicker;
