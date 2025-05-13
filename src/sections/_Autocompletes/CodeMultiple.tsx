import CodeSelect, { CodeSelectProps } from "@/sections/_Autocompletes/Code";
import { IPropertyCodeRes } from "@/types/properties";
import { AutocompleteRenderGetTagProps, SxProps, Theme } from "@mui/material";
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

const getTagClassname = (id: number) => `PPCodeMultiple-TagUser${id}`;

const RenderTags = (
    tagValue: IPropertyCodeRes[],
    getTagProps: AutocompleteRenderGetTagProps
) =>
    tagValue.map((option, index) => {
        const {
            key,
            className: _className,
            ...tagProps
        } = getTagProps({ index });

        const className = `${_className} ${getTagClassname(option.id)}`;

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
                className={className}
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

    inputSx?: SxProps<Theme>;
}

const CodeAutocompleteMultiple = forwardRef<
    HTMLElement,
    CodeAutocompleteMultipleProps
>(({ label, error, helperText, inputSx, ...props }, ref) => (
    <CodeSelect<true>
        ref={ref}
        multiple
        getOptionLabel={getOptionLabel}
        renderTags={RenderTags}
        renderInput={(other) => (
            <MultilineTextField
                multiline
                label={label}
                {...other}
                sx={inputSx}
                error={error}
                helperText={helperText}
            />
        )}
        {...props}
    />
));

export { getTagClassname };
export type { CodeAutocompleteMultipleProps };
export default CodeAutocompleteMultiple;
