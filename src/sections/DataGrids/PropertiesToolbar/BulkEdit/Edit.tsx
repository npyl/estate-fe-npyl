import MenuItem from "@mui/material/MenuItem";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
    StyledOnlyNumbersInput,
    StyledSelect,
} from "@/sections/DataGrids/BulkEditDrawer/style";
import { EditProps } from "./types";
import { DefaultOrEdit } from "./DefaultOrEdit";
import { useGlobals } from "src/hooks/useGlobals";
import ManagerAutocomplete from "@/sections/_Autocompletes/Manager";
import { toNumberSafe } from "@/utils/toNumber";
import CustomerAutocomplete from "@/sections/_Autocompletes/Customer";

export const EditManager = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    const iValue = toNumberSafe(data);
    const onChange = useCallback((v: number) => {
        setData(v.toString());
    }, []);

    const handleDisable = () => setData("");

    return (
        <DefaultOrEdit label={t("Manager")} onDisable={handleDisable}>
            <ManagerAutocomplete value={iValue} onChange={onChange} />
        </DefaultOrEdit>
    );
};

export const EditOwner = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    const iValue = toNumberSafe(data);
    const onChange = useCallback((v: number) => {
        setData(v.toString());
    }, []);

    const handleDisable = () => setData("");

    return (
        <DefaultOrEdit label={t("Owner")} onDisable={handleDisable}>
            <CustomerAutocomplete value={iValue} onChange={onChange} />
        </DefaultOrEdit>
    );
};

export const EditZipCode = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    const handleDisable = () => setData("");

    return (
        <DefaultOrEdit label={t("Zip Code")} onDisable={handleDisable}>
            <StyledOnlyNumbersInput
                label=""
                separateThousands={false}
                value={data}
                onChange={setData}
            />
        </DefaultOrEdit>
    );
};

export const EditArea = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    const handleDisable = () => setData("");

    return (
        <DefaultOrEdit label={t("Living Space")} onDisable={handleDisable}>
            <StyledOnlyNumbersInput
                value={data}
                onChange={setData}
                adornment="m²"
            />
        </DefaultOrEdit>
    );
};

export const EditBedrooms = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    const handleDisable = () => setData("");

    return (
        <DefaultOrEdit label={t("Bedrooms")} onDisable={handleDisable}>
            <StyledOnlyNumbersInput
                type="number"
                placeholder="1,2,3..."
                value={data}
                onChange={setData}
            />
        </DefaultOrEdit>
    );
};

export const EditState = ({ data, setData }: EditProps<string>) => {
    const { t } = useTranslation();

    const enums = useGlobals();
    const stateEnum = enums?.property?.state || [];

    return (
        <DefaultOrEdit label={t("State")} onDisable={() => setData("")}>
            <StyledSelect
                value={data}
                onChange={(e) => setData(e.target.value as string)}
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
