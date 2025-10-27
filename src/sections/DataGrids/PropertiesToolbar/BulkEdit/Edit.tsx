import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import DefaultOrEdit from "../../BulkEditDrawer/DefaultOrEdit";
import { useGlobals } from "@/sections/useGlobals";
import ManagerAutocomplete from "@/ui/Autocompletes/Manager";
import toNumberSafe from "@/utils/toNumberSafe";
import CustomerAutocomplete from "@/ui/Autocompletes/Customer";
import useValueChange from "@/sections/DataGrids/BulkEditDrawer/useValueChange";
import OnlyNumbersInput from "@/components/OnlyNumbers";
import Select from "@/components/Select";

export const EditManager = () => {
    const { t } = useTranslation();

    const [value, _onChange] = useValueChange("managerId");
    const onChange = (id: number) => _onChange(id.toString());
    const iValue = toNumberSafe(value);

    return (
        <DefaultOrEdit label={t("Manager")} name="managerId">
            <ManagerAutocomplete value={iValue} onChange={onChange} />
        </DefaultOrEdit>
    );
};

export const EditOwner = () => {
    const { t } = useTranslation();

    const [value, _onChange] = useValueChange("ownerId");
    const onChange = (id: number) => _onChange(id.toString());
    const iValue = toNumberSafe(value);

    return (
        <DefaultOrEdit label={t("Owner")} name="ownerId">
            <CustomerAutocomplete value={iValue} onChange={onChange} />
        </DefaultOrEdit>
    );
};

export const EditZipCode = () => {
    const { t } = useTranslation();

    const [value, onChange] = useValueChange("zipCode");

    return (
        <DefaultOrEdit label={t("Zip Code")} name="zipCode">
            <OnlyNumbersInput
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

    const [value, onChange] = useValueChange("area");

    return (
        <DefaultOrEdit label={t("Living Space")} name="area">
            <OnlyNumbersInput
                value={value}
                onChange={onChange}
                adornment="m²"
            />
        </DefaultOrEdit>
    );
};

export const EditBedrooms = () => {
    const { t } = useTranslation();

    const [value, onChange] = useValueChange("bedrooms");

    return (
        <DefaultOrEdit label={t("Bedrooms")} name="bedrooms">
            <OnlyNumbersInput
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

    const [value, onChange] = useValueChange("state");

    return (
        <DefaultOrEdit label={t("State")} name="state">
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value as string)}
            >
                {stateEnum.map(({ key, value }) => (
                    <MenuItem key={key} value={key}>
                        {value}
                    </MenuItem>
                ))}
            </Select>
        </DefaultOrEdit>
    );
};
