import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useCallback } from "react";
import Checkbox from "@mui/material/Checkbox";
import useValueChange from "@/sections/DataGrids/BulkEditDrawer/useValueChange";
import { useGetIntegrationsQuery } from "@/services/company";
import { IntegrationSite } from "@/types/listings";

// ---------------------------------------------------------------------------

const getOption =
    (selected: IntegrationSite[] | "") =>
    ({ id, siteUrl }: any) => {
        const checked = Array.isArray(selected) && selected.includes(id);
        return (
            <MenuItem key={id} value={id}>
                <Checkbox checked={checked} />
                {siteUrl}
            </MenuItem>
        );
    };

// ---------------------------------------------------------------------------

const Integrations = () => {
    const { t } = useTranslation();

    const { data } = useGetIntegrationsQuery();

    const renderValue = useCallback(
        (v: string[]) =>
            v.map((valueId) => data?.find(({ id }) => id === valueId)?.name),
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
        <Stack>
            <InputLabel>{t("Integrations")}</InputLabel>
            <Select
                multiple
                value={value}
                renderValue={renderValue as any}
                onChange={handleChange}
            >
                {data?.map(getOption(value))}
            </Select>
        </Stack>
    );
};

export default Integrations;
