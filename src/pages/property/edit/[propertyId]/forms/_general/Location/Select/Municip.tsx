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

import { useGetMunicipalitiesQuery } from "src/services/location";
import MenuItem from "./MenuItem";

const name = "location.city";
const regionName = "location.region";

interface IMunicipSelectProps {
    onChange?: (lat: number, lng: number) => void;
}

const MunicipSelect: FC<IMunicipSelectProps> = ({ onChange }) => {
    const { watch, setValue } = useFormContext();

    const { t, i18n } = useTranslation();

    const municipCode = watch(name);
    const regionCode = watch(regionName);

    const municips =
        useGetMunicipalitiesQuery(+regionCode, { skip: !regionCode }).data ||
        [];

    const handleChange = (event: SelectChangeEvent<string>) => {
        const municipCode = event.target.value;

        // update
        setValue(name, municipCode);

        if (!onChange) return;

        const selectedSubArea = municips!.filter(
            (municip) => municip.areaID.toString() === municipCode // filter by id
        )[0];

        onChange(selectedSubArea.latitude, selectedSubArea.longitude);
    };

    const renderValue = useCallback(
        (s: string) => {
            const option = municips.find(
                (municip) => municip.areaID.toString() === s
            );
            return option
                ? i18n.language === "en"
                    ? option.nameEN
                    : option.nameGR
                : "";
        },
        [municips, i18n.language]
    );

    return (
        <FormControl fullWidth>
            <InputLabel>{t("Municipality")}</InputLabel>
            <RHFSelect
                disabled={municips.length === 0}
                name={name}
                onChange={handleChange}
                renderValue={renderValue}
                input={<OutlinedInput label={t("Municipality")} />}
            >
                {municips.map(({ areaID, nameEN, nameGR }) => (
                    <MenuItem
                        key={areaID}
                        value={areaID.toString()}
                        nameEN={nameEN}
                        nameGR={nameGR}
                        checked={areaID.toString() === municipCode}
                    />
                ))}
            </RHFSelect>
        </FormControl>
    );
};

export default MunicipSelect;
