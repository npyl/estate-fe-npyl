import CodeSelect from "@/sections/CodeSelect";
import { AutocompleteRenderGetTagProps, Chip } from "@mui/material";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const getOptionLabel = (o: string | number) => (typeof o === "number" ? "" : o);

// ---------------------------------------------------------------------------

const renderTags = (
    tagValue: string[],
    getTagProps: AutocompleteRenderGetTagProps
) =>
    tagValue.map((option, index) => {
        const { key, ...tagProps } = getTagProps({ index });
        return <Chip key={key} label={option} {...tagProps} />;
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
                field: { onChange, ...field },
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
                    onChange={(_, v) => onChange(v)}
                />
            )}
        />
    );
};

export default PropertiesAutocomplete;
