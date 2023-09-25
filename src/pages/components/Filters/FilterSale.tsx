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
import { useAllGlobalsQuery } from "src/services/global";
import { selectStates, setStates } from "src/slices/filters";
import { useDispatch, useSelector } from "src/store";

export default function SaleSelect() {
    const dispatch = useDispatch();
    const states = useSelector(selectStates);
    const { data } = useAllGlobalsQuery();
    const stateEnum = data?.property?.state;
    const { t } = useTranslation();
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
        <FormControl sx={{ minWidth: "130px" }}>
            <InputLabel id="demo-simple-select-label">{t("State")}</InputLabel>
            <Select
                multiple
                labelId="demo-simple-select-label"
                value={states}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
                input={<OutlinedInput label="Κατάσταση" />}
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                {stateEnum.map(({ key, value }) => {
                    return (
                        <MenuItem key={key} value={key}>
                            <Checkbox checked={states.indexOf(key) > -1} />

                            {value}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
