import CodeSelect, { CodeSelectProps } from "@/sections/_Autocompletes/Code";
import { IPropertyCodeRes } from "@/types/properties";
import { AutocompleteRenderGetTagProps } from "@mui/material";
import Stack from "@mui/material/Stack";
import ChipLink from "@/components/ChipLink";
import MultilineTextField from "@/components/MultilineTextField";
import getIcons from "@/assets/icons/parent-categories";
import { FC, forwardRef } from "react";

// ---------------------------------------------------------------------------

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

// --------------------------------------------------------------------------

interface CodeAutocompleteMultipleProps
    extends Omit<
        CodeSelectProps<true>,
        "getOptionLabel" | "renderTags" | "renderInput"
    > {
    label?: string;
    error?: boolean;
    helperText?: string;
}

const CodeAutocompleteMultiple = forwardRef<
    HTMLElement,
    CodeAutocompleteMultipleProps
>(({ label, error, helperText, ...props }, ref) => (
    <CodeSelect<true>
        ref={ref as any}
        multiple
        getOptionLabel={getOptionLabel}
        renderTags={RenderTags}
        renderInput={(other) => (
            <MultilineTextField
                multiline
                label={label}
                {...other}
                error={error}
                helperText={helperText}
            />
        )}
        {...props}
    />
));

export type { CodeAutocompleteMultipleProps };
export default CodeAutocompleteMultiple;
