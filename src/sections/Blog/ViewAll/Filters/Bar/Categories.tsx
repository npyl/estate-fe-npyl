import { useFiltersContext } from "../Context";
import { useTranslation } from "react-i18next";
import { useCallback, useMemo } from "react";
import Select, { SelectChangeEvent } from "@/components/Select";
import { NOT_SELECTED_VALUE } from "@/constants/select";
import MenuItem from "@mui/material/MenuItem";
import { TranslationType } from "@/types/translation";
import { getCATEGORIES } from "@/sections/Blog/constants";

type TNotSelected = typeof NOT_SELECTED_VALUE;

interface IOption {
    key: TNotSelected | string;
    value: string;
}

const getOption = ({ value, key }: IOption, index: number) => (
    <MenuItem key={index} value={key}>
        {value}
    </MenuItem>
);

const getOPTIONS = (t: TranslationType): IOption[] => [
    {
        key: NOT_SELECTED_VALUE,
        value: t("Not selected"),
    },
    ...getCATEGORIES(t),
];

const Categories = () => {
    const { t } = useTranslation();
    const OPTIONS = useMemo(() => getOPTIONS(t), [t]);

    const {
        filters: { categories },
        setCategories,
    } = useFiltersContext();

    const onChange = useCallback(
        (e: SelectChangeEvent<number[] | TNotSelected>) => {
            const v = e.target.value;
            if (Array.isArray(v) && v.includes(NOT_SELECTED_VALUE as any))
                setCategories([]);
            else setCategories(v as number[]);
        },
        []
    );

    return (
        <Select<number[]>
            multiple
            label={t("Categories")}
            value={categories}
            onChange={onChange}
        >
            {OPTIONS.map(getOption)}
        </Select>
    );
};

export default Categories;
