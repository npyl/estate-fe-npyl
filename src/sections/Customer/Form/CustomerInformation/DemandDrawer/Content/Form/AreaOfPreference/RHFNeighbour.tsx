import { Checkbox, MenuItem, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FC, useEffect, useState } from "react";
import { useLazyGetNeighbourhoodsQuery } from "src/services/location";
import { IGeoLocation } from "@/types/geolocation";
import { Controller, useFormContext } from "react-hook-form";
import { IDemandForms } from "../../../Form";
import WithDynamicName from "@/components/hook-form/dynamic/WithDynamicName";
import Select, { SelectChangeEvent } from "@/components/Select";

interface NeighbourSelectProps {
    municipCodes: string[];
    value: string[];
    onChange: (neighbourCodes: string[], lat?: number, lng?: number) => void;
}

const NeighbourSelectDemands = (props: NeighbourSelectProps) => {
    const { municipCodes, value, onChange } = props;
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
    }, [municipCodes]);

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

    if (!allNeighbours.length) return null;

    return (
        <Select
            multiple
            fullWidth
            value={value}
            onChange={handleChange}
            label={t("Neighborhood")}
            renderValue={(selected) => {
                const selectedNeighbours = allNeighbours.filter((neighbour) =>
                    selected.includes(neighbour.areaID.toString())
                );
                return selectedNeighbours
                    .map((neighbour) => neighbour.nameGR)
                    .join(", ");
            }}
            MenuProps={{
                PaperProps: { sx: { maxHeight: "60vh" } },
            }}
        >
            {allNeighbours.map((option) => (
                <MenuItem key={option.areaID} value={option.areaID.toString()}>
                    <Checkbox
                        checked={value.includes(option.areaID.toString())}
                    />
                    <ListItemText primary={option.nameGR} />
                </MenuItem>
            ))}
        </Select>
    );
};

// -----------------------------------------------------------------------------------------------

interface Props {
    municipCodes: string[];
    name: keyof IDemandForms;
    onChange: (lat?: number, lng?: number) => void;
}

const RHFNeighbour: FC<Props> = ({
    municipCodes,
    name,
    onChange: _onChange,
}) => {
    const { control } = useFormContext<IDemandForms>();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
                <NeighbourSelectDemands
                    municipCodes={municipCodes}
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

export default WithDynamicName(RHFNeighbour);
