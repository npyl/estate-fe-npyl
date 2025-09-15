import Select, { SelectChangeEvent, SelectProps } from "@/components/Select";
import { useGlobals } from "@/sections/useGlobals";
import { KeyValue } from "@/types/KeyValue";
import MenuItem from "@mui/material/MenuItem";
import { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

const getOption = ({ key, value }: KeyValue) => (
    <MenuItem key={key} value={key}>
        {value}
    </MenuItem>
);

interface CategorySelectProps extends Omit<SelectProps<string>, "onChange"> {
    parentCategory?: string;
    value?: string;
    onChange?: (v: string) => void;
}

const CategorySelect: FC<CategorySelectProps> = ({
    parentCategory,
    value,
    onChange: _onChange,
    ...props
}) => {
    const { t } = useTranslation();

    const data = useGlobals();
    const enums = data?.property;

    const subCategoriesMap: {
        [key: string]: KeyValue[];
    } = useMemo(
        () => ({
            RESIDENTIAL: enums?.residentialCategory || [],
            COMMERCIAL: enums?.commercialCategory || [],
            LAND: enums?.landCategory || [],
            OTHER: enums?.otherCategory || [],
        }),
        [enums]
    );

    const onChange = useCallback(
        (e: SelectChangeEvent<string>) => _onChange?.(e.target.value),
        [_onChange]
    );

    const OPTIONS = useMemo(
        () => (parentCategory ? (subCategoriesMap[parentCategory] ?? []) : []),
        [parentCategory, subCategoriesMap]
    );

    return (
        <Select
            label={t("Category")}
            value={value}
            onChange={onChange}
            disabled={!parentCategory}
            sx={{ width: "150px" }}
            {...props}
        >
            {OPTIONS.map(getOption)}
        </Select>
    );
};

export type { CategorySelectProps };
export default CategorySelect;
