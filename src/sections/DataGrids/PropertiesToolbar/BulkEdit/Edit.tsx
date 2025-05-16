import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import {
    StyledOnlyNumbersInput,
    StyledSelect,
} from "@/sections/DataGrids/BulkEditDrawer/style";
import { DefaultOrEdit } from "./DefaultOrEdit";
import { useGlobals } from "src/hooks/useGlobals";
import ManagerAutocomplete from "@/sections/_Autocompletes/Manager";
import { toNumberSafe } from "@/utils/toNumber";
import CustomerAutocomplete from "@/sections/_Autocompletes/Customer";
import useValueChange from "@/sections/DataGrids/BulkEditDrawer/useValueChange";

export const EditManager = () => {
    const { t } = useTranslation();

    const [value, _onChange, onClear] = useValueChange("managerId");
    const onChange = (id: number) => _onChange(id.toString());
    const iValue = toNumberSafe(value);

    return (
        <DefaultOrEdit label={t("Manager")} onDisable={onClear}>
            <ManagerAutocomplete value={iValue} onChange={onChange} />
        </DefaultOrEdit>
    );
};

export const EditOwner = () => {
    const { t } = useTranslation();

    const [value, _onChange, onClear] = useValueChange("ownerId");
    const onChange = (id: number) => _onChange(id.toString());
    const iValue = toNumberSafe(value);

    return (
        <DefaultOrEdit label={t("Owner")} onDisable={onClear}>
            <CustomerAutocomplete value={iValue} onChange={onChange} />
        </DefaultOrEdit>
    );
};

export const EditZipCode = () => {
    const { t } = useTranslation();

    const [value, onChange, onClear] = useValueChange("zipCode");

    return (
        <DefaultOrEdit label={t("Zip Code")} onDisable={onClear}>
            <StyledOnlyNumbersInput
                label=""
                separateThousands={false}
                value={value}
                onChange={onChange}
            />
        </DefaultOrEdit>
    );
};

export const EditArea = () => {
    const { t } = useTranslation();

    const [value, onChange, onClear] = useValueChange("area");

    return (
        <DefaultOrEdit label={t("Living Space")} onDisable={onClear}>
            <StyledOnlyNumbersInput
                value={value}
                onChange={onChange}
                adornment="m²"
            />
        </DefaultOrEdit>
    );
};

export const EditBedrooms = () => {
    const { t } = useTranslation();

    const [value, onChange, onClear] = useValueChange("bedrooms");

    return (
        <DefaultOrEdit label={t("Bedrooms")} onDisable={onClear}>
            <StyledOnlyNumbersInput
                type="number"
                placeholder="1,2,3..."
                value={value}
                onChange={onChange}
            />
        </DefaultOrEdit>
    );
};

export const EditState = () => {
    const { t } = useTranslation();

    const enums = useGlobals();
    const stateEnum = enums?.property?.state || [];

    const [value, onChange, onClear] = useValueChange("state");

    return (
        <DefaultOrEdit label={t("State")} onDisable={onClear}>
            <StyledSelect
                value={value}
                onChange={(e) => onChange(e.target.value as string)}
            >
                {stateEnum.map((item, index) => (
                    <MenuItem key={index} value={item.key}>
                        {item.value}
                    </MenuItem>
                ))}
            </StyledSelect>
        </DefaultOrEdit>
    );
};
