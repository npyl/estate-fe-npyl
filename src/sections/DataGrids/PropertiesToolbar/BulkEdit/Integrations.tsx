import { useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@/components/Select";
import { useCallback } from "react";
import Checkbox from "@mui/material/Checkbox";
import useValueChange from "@/sections/DataGrids/BulkEditDrawer/useValueChange";
import { useGetIntegrationsQuery } from "@/services/company";
import { IIntegration, IntegrationSite } from "@/types/integrations";

// ---------------------------------------------------------------------------

const getOption =
    (selected: IntegrationSite[] | "") =>
    ({ id, name }: IIntegration) => {
        const checked = Array.isArray(selected) && selected.includes(id);
        return (
            <MenuItem key={id} value={id}>
                <Checkbox checked={checked} />
                {name}
            </MenuItem>
        );
    };

// ---------------------------------------------------------------------------

const Integrations = () => {
    const { t } = useTranslation();

    const { data } = useGetIntegrationsQuery();

    const renderValue = useCallback(
        (v: IntegrationSite[]) =>
            v
                .map((valueId) => data?.find(({ id }) => id === valueId)?.name)
                ?.join(", "),
        [data]
    );

    const [value, onChange] = useValueChange("integrations");

    const handleChange = (event: SelectChangeEvent<number[]>) => {
        const {
            target: { value },
        } = event;
        onChange(value as number[]);
    };

    return (
        <Select
            multiple
            label={t("Integrations")}
            value={value}
            renderValue={renderValue as any}
            onChange={handleChange}
        >
            {data?.map(getOption(value))}
        </Select>
    );
};

export default Integrations;
