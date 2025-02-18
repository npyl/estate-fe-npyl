import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import { IPublicSitesRes, useGetPublicSitesQuery } from "@/services/company";
import { FC, useCallback } from "react";
import Checkbox from "@mui/material/Checkbox";

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

interface ActiveProps extends Omit<SelectProps<number[]>, "multiple"> {}

const Active: FC<ActiveProps> = ({ value = [], ...props }) => {
    const { t } = useTranslation();

    const { data } = useGetPublicSitesQuery();

    const renderValue = useCallback(
        (v: number[]) =>
            v.map((valueId) => data?.find(({ id }) => id === valueId)?.siteUrl),
        [data]
    );

    return (
        <Stack>
            <InputLabel>{t("Active")}</InputLabel>
            <Select multiple value={value} renderValue={renderValue} {...props}>
                {data?.map(getOption(value))}
            </Select>
        </Stack>
    );
};

export default Active;
