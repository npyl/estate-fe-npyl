import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useCallback } from "react";
import Checkbox from "@mui/material/Checkbox";
import { useGetPublicSitesQuery } from "@/services/company";
import { useFiltersContext } from "../Context";
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

const Sites = () => {
    const { data } = useGetPublicSitesQuery();

    const renderValue = useCallback(
        (v: number[]) =>
            v
                .map(
                    (valueId) => data?.find(({ id }) => id === valueId)?.siteUrl
                )
                ?.join(", "),
        [data]
    );

    const onChange = useCallback((e: SelectChangeEvent<HTMLSelectElement>) => {
        const v = e.target.value;
        if (!v) return;
        setSites(v as unknown as number[]);
    }, []);

    const {
        filters: { sites },
        setSites,
    } = useFiltersContext();

    return (
        <Select
            multiple
            value={sites as any}
            renderValue={renderValue as any}
            onChange={onChange}
        >
            {data?.map(getOption(sites))}
        </Select>
    );
};

export default Sites;
