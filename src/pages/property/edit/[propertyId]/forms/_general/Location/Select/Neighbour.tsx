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

import { useGetNeighbourhoodsQuery } from "src/services/location";

import MenuItem from "./MenuItem";

const name = "location.complex";
const municipName = "location.city";

interface NeighbourSelectProps {
    onChange?: (lat: number, lng: number) => void;
}

const NeighbourSelect: FC<NeighbourSelectProps> = ({ onChange }) => {
    const { watch, setValue } = useFormContext();

    const { t, i18n } = useTranslation();

    const neighbourCode = watch(name);
    const municipCode = watch(municipName);

    const neighbours =
        useGetNeighbourhoodsQuery(+municipCode, {
            skip: !municipCode,
        }).data || [];

    const handleChange = (event: SelectChangeEvent<string>) => {
        const neighbourCode = event.target.value;

        // update
        setValue(name, neighbourCode);

        if (!onChange) return;

        const selectedNeighbour = neighbours!.filter(
            (neighbour) => neighbour.areaID.toString() === neighbourCode // filter by id
        )[0];

        onChange(selectedNeighbour.latitude, selectedNeighbour.longitude);
    };

    const renderValue = useCallback(
        (selected: string) => {
            const option = neighbours.find(
                (neighbour) => neighbour.areaID.toString() === selected
            );
            return option
                ? i18n.language === "en"
                    ? option.nameEN
                    : option.nameGR
                : "";
        },
        [neighbours, i18n.language]
    );

    return (
        <FormControl fullWidth>
            <InputLabel>{t("Neighborhood")}</InputLabel>
            <RHFSelect
                disabled={neighbours.length === 0}
                name={name}
                onChange={handleChange}
                renderValue={renderValue}
                input={<OutlinedInput label={t("Neighborhood")} />}
            >
                {neighbours.map((option) => (
                    <MenuItem
                        key={option.areaID}
                        value={option.areaID.toString()}
                        nameEN={option.nameEN}
                        nameGR={option.nameGR}
                        checked={option.areaID.toString() === neighbourCode}
                    />
                ))}
            </RHFSelect>
        </FormControl>
    );
};

export default NeighbourSelect;
