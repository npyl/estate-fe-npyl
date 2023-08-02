import {
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "src/components/label";
import { useGetLabelsQuery } from "src/services/labels";
import { selectDemandLabels, setDemandLabels } from "src/slices/customer";

export const LabelSelect: React.FC = () => {
    const dispatch = useDispatch();

    const labels: number[] = useSelector(selectDemandLabels) || [];
    const { data } = useGetLabelsQuery();
    const labelOptions = data?.propertyLabels;

    if (!labelOptions) return null;

    const handleChange = (event: SelectChangeEvent<typeof labels>) => {
        const {
            target: { value },
        } = event;
        dispatch(
            setDemandLabels(
                // On autofill we get a stringified value.
                typeof value === "string" ? value.split(",") : value
            )
        );
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Ετικέτες</InputLabel>
            <Select
                multiple
                labelId="demo-simple-select-label"
                value={labels}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
                input={<OutlinedInput label="Ετικέτες" />}
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                {labelOptions.map((option) => {
                    return (
                        <MenuItem key={option.id} value={option.id}>
                            <Checkbox
                                checked={labels.indexOf(option.id!) > -1}
                            />
                            <Label
                                variant="soft"
                                sx={{
                                    bgcolor: option.color,
                                    borderRadius: 7,
                                    color: "white",
                                }}
                            >
                                {option.name}
                            </Label>
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};
