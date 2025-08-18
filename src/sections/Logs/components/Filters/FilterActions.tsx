import { Checkbox, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGlobals } from "src/hooks/useGlobals";
import { useFiltersContext, useSelectActions } from "./Context";
import Select, { SelectChangeEvent } from "@/components/Select";

export default function FilterActions() {
    const { t } = useTranslation();
    const data = useGlobals();
    const logsEnums = data?.logs;
    const actionsEnums = logsEnums?.userActions || [];

    const { setActions } = useFiltersContext();
    const actions = useSelectActions() ?? [];

    const handleChange = (event: SelectChangeEvent<typeof actions>) => {
        const {
            target: { value },
        } = event;
        setActions(typeof value === "string" ? value.split(",") : value);
    };

    const getSelectedActionValues = (selectedKeys: string[]) => {
        return selectedKeys.map((key: string) => {
            const found = actionsEnums?.find((action) => action.key === key);
            return found ? found.value : "Unknown"; // Or some default text or error handling
        });
    };

    return (
        <Select
            multiple
            value={actions}
            formControlProps={{
                sx: { minWidth: "130px", maxWidth: "130px" },
            }}
            onChange={handleChange}
            renderValue={(selected) => {
                const displayValues = getSelectedActionValues(selected);
                return displayValues.join(", ");
            }}
            label={t("Action")}
            MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
        >
            {actionsEnums!.map(({ key, value }) => {
                const isKeySelected = actions?.includes(key);

                return (
                    <MenuItem key={key} value={key}>
                        <Checkbox checked={isKeySelected} />
                        {value}
                    </MenuItem>
                );
            })}
        </Select>
    );
}
