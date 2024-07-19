import {
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { useGetNeighbourhoodsQuery } from "src/services/location";

interface NeighbourSelectProps {
    municipCode: string;
    neighbourCodes: string[];
    onChange: (neighbourCodes: string[], lat?: number, lng?: number) => void;
}

const NeighbourSelect = (props: NeighbourSelectProps) => {
    const { municipCode, neighbourCodes, onChange } = props;
    const { t } = useTranslation();
    const neighbours =
        useGetNeighbourhoodsQuery(+municipCode, {
            skip: !municipCode,
        }).data || [];

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const selectedCodes = event.target.value as string[];
        const selectedNeighbour = neighbours.find(
            (neighbour) =>
                neighbour.areaID.toString() ===
                selectedCodes[selectedCodes.length - 1] // get the last selected
        );

        onChange(
            selectedCodes,
            selectedNeighbour ? selectedNeighbour.latitude : undefined,
            selectedNeighbour ? selectedNeighbour.longitude : undefined
        );
    };

    if (!neighbours) return null;

    return (
        <FormControl fullWidth>
            <InputLabel>{t("Neighborhood")}</InputLabel>
            <Select
                // multiple
                value={neighbourCodes}
                onChange={handleChange}
                renderValue={(selected) => {
                    const selectedNeighbours = neighbours.filter((neighbour) =>
                        selected.includes(neighbour.areaID.toString())
                    );
                    return selectedNeighbours
                        .map((neighbour) => neighbour.nameGR)
                        .join(", ");
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
                            checked={neighbourCodes.includes(
                                option.areaID.toString()
                            )}
                        />
                        <ListItemText primary={option.nameGR} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default NeighbourSelect;
