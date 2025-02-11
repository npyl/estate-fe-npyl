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
import { useLazyGetMunicipalitiesQuery } from "src/services/location";
import { IGeoLocation } from "@/types/geolocation";

interface IMunicipSelectProps {
    regionCodes: string[];
    municipCodes: string[];
    onChange: (municipCodes: string[], lat?: number, lng?: number) => void;
}

const MunicipSelectDemands = (props: IMunicipSelectProps) => {
    const { municipCodes, regionCodes, onChange } = props;
    const { t } = useTranslation();
    const [allMunicipalities, setAllMunicipalities] = useState<IGeoLocation[]>(
        []
    );
    const [getMunicipalities] = useLazyGetMunicipalitiesQuery();

    useEffect(() => {
        const fetchAllMunicipalities = async () => {
            const allMunicipalitiesData: IGeoLocation[] = [];

            for (const code of regionCodes) {
                const { data: municipalities } = await getMunicipalities(+code);
                if (municipalities) {
                    allMunicipalitiesData.push(...municipalities);
                }
            }

            setAllMunicipalities(allMunicipalitiesData);
        };

        fetchAllMunicipalities();
    }, [regionCodes, getMunicipalities]);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const selectedCodes = event.target.value as string[];
        const selectedMunicip = allMunicipalities.find(
            (municip) =>
                municip.areaID.toString() ===
                selectedCodes[selectedCodes.length - 1] // get the last selected
        );

        onChange(
            selectedCodes,
            selectedMunicip ? selectedMunicip.latitude : undefined,
            selectedMunicip ? selectedMunicip.longitude : undefined
        );
    };

    // Clear cities and complexes if no region is selected
    useEffect(() => {
        if (regionCodes.length === 0) {
            onChange([]);
        }
    }, [regionCodes, onChange]);

    if (!allMunicipalities.length) return null;

    return (
        <FormControl fullWidth>
            <InputLabel>{t("Municipality")}</InputLabel>
            <Select
                multiple
                value={municipCodes}
                onChange={handleChange}
                renderValue={(selected) => {
                    const selectedMunicips = allMunicipalities.filter(
                        (municip) =>
                            selected.includes(municip.areaID.toString())
                    );
                    return selectedMunicips
                        .map((municip) => municip.nameGR)
                        .join(", ");
                }}
                input={<OutlinedInput label={t("Municipality")} />}
                MenuProps={{
                    PaperProps: { sx: { maxHeight: "60vh" } },
                }}
            >
                {allMunicipalities.map((option) => (
                    <MenuItem
                        key={option.areaID}
                        value={option.areaID.toString()}
                    >
                        <Checkbox
                            checked={municipCodes.includes(
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

export default MunicipSelectDemands;
