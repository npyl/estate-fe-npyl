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
import { FC, useEffect, useState } from "react";
import { useLazyGetMunicipalitiesQuery } from "src/services/location";
import { IGeoLocation } from "@/types/geolocation";
import { Controller, useFormContext } from "react-hook-form";
import { IDemandForms } from "../../../Form";
import WithDynamicName from "@/components/hook-form/dynamic/WithDynamicName";

interface IMunicipSelectProps {
    regionCodes: string[];
    value: string[];
    onChange: (municipCodes: string[], lat?: number, lng?: number) => void;
}

const MunicipSelectDemands = (props: IMunicipSelectProps) => {
    const { value, regionCodes, onChange } = props;

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
    }, [regionCodes]);

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

    if (!allMunicipalities.length) return null;

    return (
        <FormControl fullWidth>
            <InputLabel>{t("Municipality")}</InputLabel>
            <Select
                multiple
                value={value}
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
                            checked={value.includes(option.areaID.toString())}
                        />
                        <ListItemText primary={option.nameGR} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

// ------------------------------------------------------------------------------------------------

interface Props {
    regionCodes: string[];
    name: keyof IDemandForms;
    onChange: (lat?: number, lng?: number) => void;
}

const RHFMunicips: FC<Props> = ({ name, regionCodes, onChange: _onChange }) => {
    const { control } = useFormContext<IDemandForms>();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
                <MunicipSelectDemands
                    regionCodes={regionCodes}
                    value={value as unknown as string[]}
                    onChange={(v: string[], lat?: number, lng?: number) => {
                        onChange(v);
                        _onChange(lat, lng);
                    }}
                />
            )}
        />
    );
};

export default WithDynamicName(RHFMunicips);
