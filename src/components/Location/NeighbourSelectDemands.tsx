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
import { useEffect, useState } from "react";
import { useLazyGetNeighbourhoodsQuery } from "src/services/location";
import { IGeoLocation } from "@/types/geolocation";

interface NeighbourSelectProps {
    municipCodes: string[];
    neighbourCodes: string[];
    onChange: (neighbourCodes: string[], lat?: number, lng?: number) => void;
}

const NeighbourSelectDemands = (props: NeighbourSelectProps) => {
    const { municipCodes, neighbourCodes, onChange } = props;
    const { t } = useTranslation();
    const [allNeighbours, setAllNeighbours] = useState<IGeoLocation[]>([]);
    const [getNeighbourhoods] = useLazyGetNeighbourhoodsQuery();

    useEffect(() => {
        const fetchAllNeighbours = async () => {
            const allNeighboursData: IGeoLocation[] = [];

            for (const code of municipCodes) {
                const { data: neighbours } = await getNeighbourhoods(+code);

                if (neighbours) {
                    allNeighboursData.push(...neighbours);
                }
            }

            setAllNeighbours(allNeighboursData);
        };

        fetchAllNeighbours();
    }, [municipCodes, getNeighbourhoods]);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const selectedCodes = event.target.value as string[];
        const selectedNeighbour = allNeighbours.find(
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

    const availableNeighbours = allNeighbours.filter((neighbour) =>
        municipCodes.includes(neighbour.parentID.toString())
    );

    if (!availableNeighbours.length) return null;

    return (
        <FormControl fullWidth>
            <InputLabel>{t("Neighborhood")}</InputLabel>
            <Select
                multiple
                value={neighbourCodes}
                onChange={handleChange}
                renderValue={(selected) => {
                    const selectedNeighbours = availableNeighbours.filter(
                        (neighbour) =>
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
                {availableNeighbours.map((option) => (
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

export default NeighbourSelectDemands;
