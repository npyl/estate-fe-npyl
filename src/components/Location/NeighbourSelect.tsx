import {
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";

import { useGetNeighbourhoodsQuery } from "src/services/location";

interface NeighbourSelectProps {
    municipCode: string;
    neighbourCode: string;
    onChange: (neighbourCode: string, lat: number, lng: number) => void;
}

export const NeighbourSelect = (props: NeighbourSelectProps) => {
    const { municipCode, neighbourCode, onChange } = props;

    const neighbours = useGetNeighbourhoodsQuery(+municipCode).data;

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
            <InputLabel>Γειτονιά</InputLabel>
            <Select
                value={neighbourCode}
                onChange={handleChange}
                renderValue={(selected) => {
                    const option = neighbours.find(
                        (neighbour) => neighbour.areaID.toString() === selected
                    );
                    return option ? option.nameGR : "";
                }}
                input={<OutlinedInput label="Γειτονιά" />}
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
                            checked={option.areaID.toString() === municipCode}
                        />
                        {option.nameGR}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
