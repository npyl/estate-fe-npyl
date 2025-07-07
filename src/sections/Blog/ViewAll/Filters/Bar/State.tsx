import FormControl from "@mui/material/FormControl";
import { useFiltersContext } from "../Context";
import { StyledInputLabel } from "@/components/Filters/styled";
import { useTranslation } from "react-i18next";
import { useCallback, useMemo } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { NOT_SELECTED_VALUE } from "@/constants/select";
import MenuItem from "@mui/material/MenuItem";
import { TranslationType } from "@/types/translation";

interface IOption {
    value: typeof NOT_SELECTED_VALUE | boolean;
    label: string;
}

const getOption = ({ value, label }: IOption, index: number) => (
    <MenuItem key={index} value={value as any}>
        {label}
    </MenuItem>
);

const getOPTIONS = (t: TranslationType): IOption[] => [
    {
        value: NOT_SELECTED_VALUE,
        label: t("Not selected"),
    },
    { value: true, label: t("Published") },
    { value: false, label: t("Unpublished") },
];

const State = () => {
    const { t } = useTranslation();
    const OPTIONS = useMemo(() => getOPTIONS(t), [t]);

    const {
        filters: { published: _published },
        setPublished,
    } = useFiltersContext();

    const published =
        _published === undefined ? NOT_SELECTED_VALUE : _published;

    const onChange = useCallback((e: SelectChangeEvent<boolean>) => {
        const v = e.target.value;
        if (v === NOT_SELECTED_VALUE) setPublished(undefined);
        else setPublished(e.target.value as unknown as boolean);
    }, []);

    return (
        <FormControl sx={{ minWidth: "130px" }}>
            <StyledInputLabel>{t("State")}</StyledInputLabel>
            <Select<boolean>
                label={t("State")}
                value={published}
                onChange={onChange}
            >
                {OPTIONS.map(getOption)}
            </Select>
        </FormControl>
    );
};

export default State;
