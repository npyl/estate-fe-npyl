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
import { useDispatch, useSelector } from "react-redux";
import { useGlobals } from "src/hooks/useGlobals";
import { selectActions, setActions } from "src/slices/log";
import { KeyValue } from "src/types/KeyValue";

export default function FilterActions() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const data = useGlobals();

    const actions = useSelector(selectActions);

    const logsEnums = data?.logs;
    const resourceEnums = logsEnums?.resourceTypes;
    const actionsEnums = logsEnums?.userActions;

    if (!data) return null;

    const handleChange = (event: SelectChangeEvent<typeof actions>) => {
        const {
            target: { value },
        } = event;
        dispatch(
            setActions(
                // On autofill we get a stringified value.
                typeof value === "string" ? value.split(",") : value
            )
        );
    };

    return (
        <FormControl sx={{ minWidth: "130px", maxWidth: "130px" }}>
            <InputLabel>{t("Action")}</InputLabel>
            <Select
                multiple
                value={actions}
                onChange={handleChange}
                renderValue={(selected: KeyValue[]) => {
                    // Change here to expect KeyValue[]
                    return selected
                        .map((item) => item.value) // Now we're directly accessing the 'value' field of each KeyValue item
                        .filter(Boolean)
                        .join(", ");
                }}
                input={<OutlinedInput label={t("Action")} />}
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                {actionsEnums!.map(({ key, value }) => {
                    // Checking the existence of 'key' in 'actions' array of KeyValue
                    const isKeySelected = actions?.some(
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
