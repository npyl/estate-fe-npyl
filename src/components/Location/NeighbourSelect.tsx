import {
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { useGetNeighbourhoodsQuery } from "src/services/location";

interface NeighbourSelectProps {
    municipCode: string;
    neighbourCode: string;
    onChange: (neighbourCode: string, lat: number, lng: number) => void;
}

const NeighbourSelect = (props: NeighbourSelectProps) => {
    const { municipCode, neighbourCode, onChange } = props;
    const { t } = useTranslation();
    const neighbours =
        useGetNeighbourhoodsQuery(+municipCode, {
            skip: !municipCode,
        }).data || [];

    const handleChange = (event: SelectChangeEvent<string>) => {
        const neighbourCode = event.target.value;
        const selectedNeighbour = neighbours!.filter(
            (neighbour) => neighbour.areaID.toString() === neighbourCode // filter by id
        )[0];

        onChange(
            neighbourCode,
            selectedNeighbour.latitude,
            selectedNeighbour.longitude
        );
    };

    if (!neighbours) return null;

    return (
        <FormControl fullWidth>
            <InputLabel>{t("Neighborhood")}</InputLabel>
            <Select
                value={neighbourCode}
                onChange={handleChange}
                renderValue={(selected) => {
                    const option = neighbours.find(
                        (neighbour) => neighbour.areaID.toString() === selected
                    );
                    return option ? option.nameGR : "";
                }}
                input={<OutlinedInput label={t("Neighborhood")} />}
                MenuProps={{
                    PaperProps: { sx: { maxHeight: "60vh" } },
                }}
            >
                {neighbours.map((option) => (
                    <MenuItem
                        key={option.areaID}
                        value={option.areaID.toString()}
                    >
                        <Checkbox
                            checked={option.areaID.toString() === neighbourCode}
                        />
                        {option.nameGR}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default NeighbourSelect;
