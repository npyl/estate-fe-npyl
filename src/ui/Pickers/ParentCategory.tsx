import Select, { SelectChangeEvent } from "@/components/Select";
import { useGlobals } from "@/sections/useGlobals";
import { KeyValue } from "@/types/KeyValue";
import MenuItem from "@mui/material/MenuItem";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

const getOption = ({ key, value }: KeyValue) => (
    <MenuItem key={key} value={key}>
        {value}
    </MenuItem>
);

interface Props {
    value?: string;
    onChange?: (v: string) => void;
}

const ParentCategorySelect: FC<Props> = ({ value, onChange: _onChange }) => {
    const { t } = useTranslation();

    const data = useGlobals();
    const enums = data?.property;
    const parentCategoryEnum = enums?.parentCategory;

    const onChange = useCallback(
        (e: SelectChangeEvent<string>) => _onChange?.(e.target.value),
        [_onChange]
    );

    return (
        <Select
            label={t("Parent Category")}
            value={value}
            onChange={onChange}
            sx={{ width: "180px" }}
        >
            {parentCategoryEnum?.map(getOption)}
        </Select>
    );
};

export default ParentCategorySelect;
