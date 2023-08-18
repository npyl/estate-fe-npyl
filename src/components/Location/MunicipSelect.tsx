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

import { useGetMunicipalitiesQuery } from "src/services/location";

interface IMunicipSelectProps {
    regionCode: string;
    municipCode: string;
    onChange: (municipCode: string, lat: number, lng: number) => void;
}

export const MunicipSelect = (props: IMunicipSelectProps) => {
    const { municipCode, regionCode, onChange } = props;
    const { t } = useTranslation();
    const municips = useGetMunicipalitiesQuery(+regionCode).data;

    const handleChange = (event: SelectChangeEvent<string>) => {
        const municipCode = event.target.value;
        const selectedSubArea = municips!.filter(
            (municip) => municip.areaID.toString() === municipCode // filter by id
        )[0];

        onChange(
            municipCode,
            selectedSubArea.latitude,
            selectedSubArea.longitude
        );
    };

    if (!municips) return null;

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
                {t("Municipality / District")}
            </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                value={municipCode}
                onChange={handleChange}
                renderValue={(selected) => {
                    const option = municips.find(
                        (municip) => municip.areaID.toString() === selected
                    );
                    return option ? option.nameGR : "";
                }}
                input={<OutlinedInput label={t("Municipality / District")} />}
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
                            checked={option.areaID.toString() === municipCode}
                        />
                        {option.nameGR}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
