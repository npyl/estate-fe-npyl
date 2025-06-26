import { TextField, MenuItem } from "@mui/material";
import { useGlobals } from "@/hooks/useGlobals";
import { IGlobalProperty } from "@/types/global";
import { useTranslation } from "react-i18next";
import { KeyValue } from "@/types/KeyValue";
import { ChangeEvent, useCallback, useMemo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { ICreatePropertyParams } from "@/services/properties";

const CATEGORY_TESTID = "PPCategorySelectTestId";
const getDataTestId = (index: number) => `PPCategoryOption-${index}`;

const RHFCategory = () => {
    const { t } = useTranslation();

    const { control } = useFormContext<ICreatePropertyParams>();
    const parentCategory = useWatch<ICreatePropertyParams>({
        name: "parentCategory",
    });

    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;

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

    const CATEGORIES = subCategoriesMap[parentCategory!] ?? [];

    const onChangeCb = useCallback(
        (onChange: (...event: any[]) => void) =>
            (e: ChangeEvent<HTMLInputElement>) => {
                const k = e.target.value;
                const found = CATEGORIES.find(({ key }) => key === k);
                if (!found) return;
                onChange(found.key);
            },
        [CATEGORIES]
    );

    return (
        <Controller
            name="category"
            control={control}
            render={({
                field: { onChange, ...field },
                fieldState: { error },
            }) => (
                <TextField
                    data-testid={CATEGORY_TESTID}
                    disabled={!parentCategory}
                    select
                    label={t("Category")}
                    error={!!error}
                    helperText={error?.message ?? ""}
                    onChange={onChangeCb(onChange)}
                    {...field}
                >
                    {CATEGORIES.map(({ key, value }, index) => (
                        <MenuItem
                            data-testid={getDataTestId(index)}
                            key={key}
                            value={key}
                        >
                            {value}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        />
    );
};

export { CATEGORY_TESTID, getDataTestId };
export default RHFCategory;
