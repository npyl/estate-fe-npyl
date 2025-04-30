import { useGlobals } from "@/hooks/useGlobals";
import Typography from "@mui/material/Typography";
import { KeyValue } from "@/types/KeyValue";
import { CSSProperties, FC, useCallback, useMemo } from "react";
import { PPButton } from "@/components/styled";
import Stack from "@mui/material/Stack";
import getIcons from "@/assets/icons/parent-categories";
import Grid from "@mui/material/Unstable_Grid2";

const IconsStyle: CSSProperties = {
    width: 45,
    height: 45,
};

interface IOption {
    option: KeyValue;
    value: string | string[];
    onClick: (key: string) => void;
}

const Option: FC<IOption> = ({
    option: { key, value },
    value: _value,
    onClick: _onClick,
}) => {
    const isChecked = useMemo(() => {
        if (typeof _value == "string") return key === _value;
        if (Array.isArray(value)) return _value.includes(key);
    }, [key, _value]);
    const onClick = useCallback(() => _onClick(key), [key, _onClick]);

    return (
        <Grid xs={3}>
            <PPButton clicked={isChecked} onClick={onClick}>
                {getIcons(IconsStyle)[key]}
                <Stack alignItems={"center"} mt={1}>
                    <Typography>{value}</Typography>
                </Stack>
            </PPButton>
        </Grid>
    );
};

// ------------------------------------------------------------------------

const getOption =
    (value: string | string[], onClick: (key: string) => void) =>
    (o: KeyValue) => (
        <Option key={o.key} option={o} value={value} onClick={onClick} />
    );

// ------------------------------------------------------------------------

interface ParentCategoryPickerProps<Multiple extends boolean = false> {
    value: Multiple extends true ? string[] : string;
    onClick: (key: string) => void;
}

const ParentCategoryPicker: FC<ParentCategoryPickerProps> = ({
    value,
    onClick,
}) => {
    const data = useGlobals();
    const parentCategoryEnum = data?.property?.parentCategory || [];

    return (
        <Grid container spacing={1} flexWrap="wrap" p={1}>
            {parentCategoryEnum.map(getOption(value, onClick))}
        </Grid>
    );
};

export default ParentCategoryPicker;
