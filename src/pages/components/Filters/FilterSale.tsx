import {
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useAllGlobalsQuery } from "src/services/global";
import { selectStates, setStates } from "src/slices/filters";
import { useDispatch, useSelector } from "src/store";

export default function SaleSelect() {
    const dispatch = useDispatch();
    const states = useSelector(selectStates);
    const { data } = useAllGlobalsQuery();
    const stateEnum = data?.property?.state;

    if (!stateEnum) return null;

    const handleChange = (event: SelectChangeEvent<typeof states>) => {
        const {
            target: { value },
        } = event;
        dispatch(
            setStates(
                // On autofill we get a stringified value.
                typeof value === "string" ? value.split(",") : value
            )
        );
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
                multiple
                labelId="demo-simple-select-label"
                value={states}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
                input={<OutlinedInput label="Κατάσταση" />}
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                {stateEnum.map((option) => {
                    return (
                        <MenuItem key={option} value={option}>
                            <Checkbox checked={states.indexOf(option) > -1} />

                            {option}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
