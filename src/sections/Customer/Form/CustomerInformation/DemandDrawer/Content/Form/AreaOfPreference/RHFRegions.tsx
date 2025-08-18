import { Checkbox, MenuItem, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetRegionsQuery } from "src/services/location";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IDemandForms } from "../../../Form";
import WithDynamicName from "@/components/hook-form/dynamic/WithDynamicName";
import Select, { SelectChangeEvent } from "@/components/Select";

interface IRegionSelectProps {
    value: string[];
    onChange: (selectedRegions: string[]) => void;
}

const RegionSelect = (props: IRegionSelectProps) => {
    const { value, onChange } = props;
    const { t } = useTranslation();
    const regions = useGetRegionsQuery(undefined).data || [];

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        onChange(value);
    };

    if (!regions) return null;

    return (
        <Select
            multiple
            value={value}
            label={t("Prefecture")}
            onChange={handleChange}
            renderValue={(selected) => {
                const selectedRegions = regions.filter((region) =>
                    selected.includes(region.areaID.toString())
                );
                return selectedRegions
                    .map((region) => region.nameGR)
                    .join(", ");
            }}
            MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
        >
            {regions.map((region) => (
                <MenuItem key={region.areaID} value={region.areaID.toString()}>
                    <Checkbox
                        checked={value.includes(region.areaID.toString())}
                    />
                    <ListItemText primary={region.nameGR} />
                </MenuItem>
            ))}
        </Select>
    );
};

interface Props {
    name: keyof IDemandForms;
}

const RHFRegions: FC<Props> = ({ name }) => {
    const { control } = useFormContext<IDemandForms>();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
                <RegionSelect
                    value={value as unknown as string[]}
                    onChange={onChange}
                />
            )}
        />
    );
};

export default WithDynamicName(RHFRegions);
