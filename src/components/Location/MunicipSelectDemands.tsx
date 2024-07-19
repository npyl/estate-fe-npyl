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

import { useGetMunicipalitiesQuery } from "src/services/location";

interface IMunicipSelectProps {
    regionCode: string;
    municipCodes: string[];
    onChange: (municipCodes: string[], lat?: number, lng?: number) => void;
}

const MunicipSelectDemands = (props: IMunicipSelectProps) => {
    const { municipCodes, regionCode, onChange } = props;
    const { t } = useTranslation();
    const municips =
        useGetMunicipalitiesQuery(+regionCode, { skip: !regionCode }).data ||
        [];

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const selectedCodes = event.target.value as string[];
        const selectedMunicip = municips.find(
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

    if (!municips) return null;

    return (
        <FormControl fullWidth>
            <InputLabel>{t("Municipality")}</InputLabel>
            <Select
                multiple
                value={municipCodes}
                onChange={handleChange}
                renderValue={(selected) => {
                    const selectedMunicips = municips.filter((municip) =>
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
                {municips.map((option) => (
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
