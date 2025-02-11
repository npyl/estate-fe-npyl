import {
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    ListItemText,
    Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetRegionsQuery } from "src/services/location";
import React from "react";

interface IRegionSelectProps {
    selectedRegions: string[];
    onChange: (selectedRegions: string[]) => void;
}

const RegionSelect = (props: IRegionSelectProps) => {
    const { selectedRegions, onChange } = props;
    const { t } = useTranslation();
    const regions = useGetRegionsQuery(undefined).data || [];

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        onChange(value);
    };

    if (!regions) return null;

    return (
        <FormControl fullWidth>
            <InputLabel>{t("Region")}</InputLabel>
            <Select
                multiple
                value={selectedRegions}
                onChange={handleChange}
                renderValue={(selected) => {
                    const selectedRegions = regions.filter((region) =>
                        selected.includes(region.areaID.toString())
                    );
                    return selectedRegions
                        .map((region) => region.nameGR)
                        .join(", ");
                }}
                input={<OutlinedInput label={t("Prefecture")} />}
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                {regions.map((region) => (
                    <MenuItem
                        key={region.areaID}
                        value={region.areaID.toString()}
                    >
                        <Checkbox
                            checked={selectedRegions.includes(
                                region.areaID.toString()
                            )}
                        />
                        <ListItemText primary={region.nameGR} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default RegionSelect;
