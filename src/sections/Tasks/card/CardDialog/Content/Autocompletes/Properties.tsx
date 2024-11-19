import CodeSelect from "@/sections/CodeSelect";
import { IPropertyCodeRes } from "@/types/properties";
import { AutocompleteRenderGetTagProps, Chip } from "@mui/material";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const getOptionLabel = (o: IPropertyCodeRes | number) =>
    typeof o === "number" ? "" : o.code;

// ---------------------------------------------------------------------------

const renderTags = (
    tagValue: IPropertyCodeRes[],
    getTagProps: AutocompleteRenderGetTagProps
) =>
    tagValue.map((option, index) => {
        const { key, ...tagProps } = getTagProps({ index });
        return <Chip key={key} label={option.code} {...tagProps} />;
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
                    renderTags={renderTags}
                    renderInput={(props) => (
                        <TextField
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
