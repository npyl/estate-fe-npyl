import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent, SelectProps } from "@/components/Select";
import { FC, useCallback } from "react";
import Checkbox from "@mui/material/Checkbox";
import { useGetPublicSitesQuery } from "@/services/company";
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

type OmitList =
    | "multiple"
    | "defaultValue"
    | "value"
    | "onChange"
    | "renderValue";

interface PublicSitesPickerProps extends Omit<SelectProps, OmitList> {
    sites: number[];
    onChange: (s: number[]) => void;
}

const PublicSitesPicker: FC<PublicSitesPickerProps> = ({
    sites,
    onChange: _onChange,
    label,
    sx,
    ...props
}) => {
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
        _onChange(v as unknown as number[]);
    }, []);

    return (
        <Select
            multiple
            label={label}
            value={sites as any}
            renderValue={renderValue as any}
            onChange={onChange}
            sx={{ width: "150px", ...sx }}
            {...props}
        >
            {data?.map(getOption(sites))}
        </Select>
    );
};

export default PublicSitesPicker;
