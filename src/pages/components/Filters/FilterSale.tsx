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
import { useGlobals } from "src/hooks/useGlobals";
import { selectStates, setStates } from "src/slices/filters";
import { useDispatch, useSelector } from "src/store";

export default function SaleSelect() {
    const dispatch = useDispatch();
    const data = useGlobals();
    const { t } = useTranslation();

    const states = useSelector(selectStates);

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
        <FormControl sx={{ minWidth: "130px" }}>
            <InputLabel id="demo-simple-select-label">{t("State")}</InputLabel>
            <Select
                multiple
                labelId="demo-simple-select-label"
                value={states}
                onChange={handleChange}
                renderValue={(selected: string[]) => {
                    return selected
                        .map(
                            (key) =>
                                stateEnum.find((item) => item.key === key)
                                    ?.value
                        )
                        .filter(Boolean) // Remove any undefined values
                        .join(", ");
                }}
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
