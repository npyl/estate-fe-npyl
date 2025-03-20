import CodeSelect from "@/sections/_Autocompletes/PropertyCode";
import { IPropertyCodeRes } from "@/types/properties";
import { AutocompleteRenderGetTagProps } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ChipLink from "@/components/ChipLink";
import MultilineTextField from "@/components/MultilineTextField";
import getIcons from "@/assets/icons/parent-categories";
import { FC } from "react";

const getOptionLabel = (o: IPropertyCodeRes | number) =>
    typeof o === "number" ? "" : o.code;

// ---------------------------------------------------------------------------

interface LabelProps {
    code: string;
    parentCategory: string;
}

const Label: FC<LabelProps> = ({ code, parentCategory }) => (
    <Stack direction="row" gap={1} alignItems="center">
        {getIcons({ width: 28, height: 28 })[parentCategory]}
        {code}
    </Stack>
);

// ---------------------------------------------------------------------------

const RenderTags = (
    tagValue: IPropertyCodeRes[],
    getTagProps: AutocompleteRenderGetTagProps
) =>
    tagValue.map((option, index) => {
        const { key, ...tagProps } = getTagProps({ index });

        return (
            <ChipLink
                key={key}
                href={`/property/${option.id}`}
                label={
                    <Label
                        code={option.code}
                        parentCategory={option.parentCategory}
                    />
                }
                {...tagProps}
            />
        );
    });

// ---------------------------------------------------------------------------

const PropertiesAutocomplete = () => {
    const { t } = useTranslation();

    const { control } = useFormContext();

    return (
        <Controller
            name="properties"
            control={control}
            render={({
                field: { value, onChange, ...field },
                fieldState: { error },
            }) => (
                <CodeSelect<true>
                    multiple
                    getOptionLabel={getOptionLabel}
                    renderTags={RenderTags}
                    renderInput={(props) => (
                        <MultilineTextField
                            multiline
                            label={t("Properties")}
                            {...props}
                            error={Boolean(error)}
                            helperText={error?.message}
                        />
                    )}
                    {...field}
                    idValue={value}
                    onChange={(_, ids) => onChange(ids)}
                />
            )}
        />
    );
};

export default PropertiesAutocomplete;
