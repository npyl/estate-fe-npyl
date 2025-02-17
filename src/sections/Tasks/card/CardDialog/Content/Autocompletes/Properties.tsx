import CodeSelect from "@/sections/CodeSelect";
import { IPropertyCodeRes } from "@/types/properties";
import { AutocompleteRenderGetTagProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ChipLink from "./ChipLink";
import MultilineTextField from "@/components/MultilineTextField";
import getIcons from "@/assets/icons/parent-categories";

const getOptionLabel = (o: IPropertyCodeRes | number) =>
    typeof o === "number" ? "" : o.code;

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
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        {/* show property icon depending on the property category */}
                        {
                            getIcons({ width: 28, height: 28 })[
                                option.parentCategory
                            ]
                        }
                        {option.code}
                    </span>
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
