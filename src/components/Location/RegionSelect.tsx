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

import { useGetRegionsQuery } from "src/services/location";

interface IRegionSelectProps {
    regionCode: string;
    onChange: (regionCode: string, lat: number, lng: number) => void;
}

const RegionSelect = (props: IRegionSelectProps) => {
    const { regionCode, onChange } = props;
    const { t } = useTranslation();
    const regions = useGetRegionsQuery(undefined).data || [];

    const handleChange = (event: SelectChangeEvent<string>) => {
        const areaID = event.target.value;
        const selectedArea = regions!.filter(
            (region) => region.areaID === +areaID // filter by areaID
        )[0];

        onChange(areaID, selectedArea.latitude, selectedArea.longitude);
    };

    if (!regions) return null;

    return (
        <FormControl fullWidth>
            <InputLabel>{t("Prefecture")}</InputLabel>
            <Select
                value={regionCode}
                onChange={(event) => handleChange(event)}
                renderValue={(selected) => {
                    const option = regions.find(
                        (region) => region.areaID === +selected
                    );
                    return option ? option.nameGR : "";
                }}
                input={<OutlinedInput label={t("Prefecture")} />}
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                {regions.map((region, index) => (
                    <MenuItem key={index} value={region.areaID}>
                        <Checkbox
                            checked={regionCode === region.areaID.toString()}
                        />
                        {region.nameGR}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default RegionSelect;
