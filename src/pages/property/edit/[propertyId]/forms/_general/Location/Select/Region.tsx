import { RHFSelect } from "@/components/hook-form";
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    SelectChangeEvent,
} from "@mui/material";
import { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import MenuItem from "./MenuItem";

import { useGetRegionsQuery } from "src/services/location";

const name = "location.region";

interface IRegionSelectProps {
    onChange?: (lat: number, lng: number) => void;
}

const RegionSelect: FC<IRegionSelectProps> = ({ onChange }) => {
    const { watch, setValue } = useFormContext();

    const { t, i18n } = useTranslation();

    const regions = useGetRegionsQuery(undefined).data || [];

    const regionCode = watch(name);

    const handleChange = (event: SelectChangeEvent<string>) => {
        const areaID = event.target.value;

        setValue(name, areaID);

        if (!onChange) return;

        const selectedArea = regions!.filter(
            (region) => region.areaID === +areaID // filter by areaID
        )[0];

        onChange(selectedArea.latitude, selectedArea.longitude);
    };

    const renderValue = useCallback(
        (selected: string) => {
            const option = regions.find(
                (region) => region.areaID === +selected
            );

            return option
                ? i18n.language === "en"
                    ? option.nameEN
                    : option.nameGR
                : "";
        },
        [regions, i18n.language]
    );

    return (
        <FormControl fullWidth>
            <InputLabel>{t("Prefecture")}</InputLabel>
            <RHFSelect
                disabled={regions.length === 0}
                name={name}
                onChange={handleChange}
                renderValue={renderValue}
                input={<OutlinedInput label={t("Prefecture")} />}
            >
                {regions.map((region, index) => (
                    <MenuItem
                        key={region.areaID}
                        value={region.areaID}
                        nameEN={region.nameEN}
                        nameGR={region.nameGR}
                        checked={regionCode === region.areaID.toString()}
                    />
                ))}
            </RHFSelect>
        </FormControl>
    );
};

export default RegionSelect;
