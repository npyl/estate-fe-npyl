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
import { useGlobals } from "src/hooks/useGlobals";
import { useTranslation } from "react-i18next";
import { selectResources, setResources } from "src/slices/log";
import { KeyValue } from "src/types/KeyValue";

export default function FilterActions() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const data = useGlobals();

    const resources = useSelector(selectResources);

    const logsEnums = data?.logs;
    const resourceEnums = logsEnums?.resourceTypes;
    const actionsEnums = logsEnums?.userActions;

    if (!data) return null;

    const handleChange = (event: SelectChangeEvent<typeof resources>) => {
        const {
            target: { value },
        } = event;
        dispatch(
            setResources(
                // On autofill we get a stringified value.
                typeof value === "string" ? value.split(",") : value
            )
        );
    };

    return (
        <FormControl sx={{ minWidth: "130px", maxWidth: "130px" }}>
            <InputLabel>{t("Resource")}</InputLabel>
            <Select
                multiple
                value={resources}
                onChange={handleChange}
                renderValue={(selected: KeyValue[]) => {
                    // Change here to expect KeyValue[]
                    return selected
                        .map((item) => item.value) // Now we're directly accessing the 'value' field of each KeyValue item
                        .filter(Boolean)
                        .join(", ");
                }}
                input={<OutlinedInput label={t("Resource")} />}
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                {actionsEnums!.map(({ key, value }) => {
                    // Checking the existence of 'key' in 'actions' array of KeyValue
                    const isKeySelected = resources?.some(
                        (action) => action.key === key
                    );

                    return (
                        <MenuItem key={key} value={key}>
                            <Checkbox checked={isKeySelected} />
                            {value}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
