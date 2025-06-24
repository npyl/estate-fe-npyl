import { Typography, Grid } from "@mui/material";
import { useGlobals } from "src/hooks/useGlobals";
import { IGlobalProperty } from "src/types/global";
import { PPButton } from "@/components/styled";
import getIcons from "@/assets/icons/parent-categories";
import { Controller, useFormContext } from "react-hook-form";
import { ICreatePropertyParams } from "@/services/properties";
import { FC, useCallback } from "react";

interface RenderProps {
    value: string;
    onChange: (v: string) => void;
    onResetCategory: VoidFunction;
}

const Render: FC<RenderProps> = ({
    value: _value,
    onChange: _onChange,
    onResetCategory,
}) => {
    // enums
    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const parentCategoryEnum = enums?.parentCategory || [];

    const onChange = useCallback(
        (key: string) => {
            onResetCategory();
            _onChange(key);
        },
        [_onChange]
    );

    return (
        <Grid
            container
            mr={1}
            my={3}
            spacing={1}
            direction={{
                xs: "column",
                sm: "row",
            }}
        >
            {parentCategoryEnum.map(({ key, value }) => (
                <Grid key={key} item xs={1} sm={6} width={1} height={1}>
                    <PPButton
                        clicked={key === _value}
                        onClick={() => onChange(key)}
                    >
                        {getIcons({ width: 80, height: 80 })[key]}
                        <Typography mt={1}>{value}</Typography>
                    </PPButton>
                </Grid>
            ))}
        </Grid>
    );
};

// const handleParentCategorySelect = (key: string) => {
//     setParentCategory(key);
//     if (parentCategory === key) {
//         return;
//     } else setCategory(""); // Reset subcategory when parent category changes
// };

const RHFParentCategory = () => {
    const { setValue, control } = useFormContext<ICreatePropertyParams>();
    const onResetCategory = useCallback(
        () => setValue("category", "", { shouldDirty: true }),
        []
    );
    return (
        <Controller
            name="parentCategory"
            control={control}
            render={({ field: { value, onChange } }) => (
                <Render
                    value={value}
                    onChange={onChange}
                    onResetCategory={onResetCategory}
                />
            )}
        />
    );
};

export default RHFParentCategory;
