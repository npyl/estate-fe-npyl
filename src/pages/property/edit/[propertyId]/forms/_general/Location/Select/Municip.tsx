import { RHFSelect } from "@/components/hook-form";
import {
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useGetMunicipalitiesQuery } from "src/services/location";

const name = "location.city";
const regionName = "location.region";

interface IMunicipSelectProps {
    onChange?: (lat: number, lng: number) => void;
}

const MunicipSelect: FC<IMunicipSelectProps> = ({ onChange }) => {
    const { watch, setValue } = useFormContext();

    const { t } = useTranslation();

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

    const renderValue = (s: string) => {
        const option = municips.find(
            (municip) => municip.areaID.toString() === s
        );
        return option ? option.nameGR : "";
    };

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
                {municips.map((option) => (
                    <MenuItem
                        key={option.areaID}
                        value={option.areaID.toString()}
                    >
                        <Checkbox
                            checked={option.areaID.toString() === municipCode}
                        />
                        {option.nameGR}
                    </MenuItem>
                ))}
            </RHFSelect>
        </FormControl>
    );
};

export default MunicipSelect;
