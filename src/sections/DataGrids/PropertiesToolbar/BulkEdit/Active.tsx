import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useGetPublicSitesQuery } from "@/services/company";
import { useCallback } from "react";
import Checkbox from "@mui/material/Checkbox";
import useValueChange from "@/sections/DataGrids/BulkEditDrawer/useValueChange";
import { IPublicSitesRes } from "@/types/company";

// ---------------------------------------------------------------------------

const getOption =
    (selected: number[] | "") =>
    ({ id, siteUrl }: IPublicSitesRes) => {
        const checked = Array.isArray(selected) && selected.includes(id);
        return (
            <MenuItem key={id} value={id}>
                <Checkbox checked={checked} />
                {siteUrl}
            </MenuItem>
        );
    };

// ---------------------------------------------------------------------------

const Active = () => {
    const { t } = useTranslation();

    const { data } = useGetPublicSitesQuery();

    const renderValue = useCallback(
        (v: number[]) =>
            v.map((valueId) => data?.find(({ id }) => id === valueId)?.siteUrl),
        [data]
    );

    const [value, onChange] = useValueChange("publicSites");

    const handleChange = (event: SelectChangeEvent<number[]>) => {
        const {
            target: { value },
        } = event;
        onChange(value as number[]);
    };

    return (
        <Stack>
            <InputLabel>{t("Active")}</InputLabel>
            <Select
                multiple
                value={value}
                renderValue={renderValue}
                onChange={handleChange}
            >
                {data?.map(getOption(value))}
            </Select>
        </Stack>
    );
};

export default Active;
