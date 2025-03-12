import { Level } from "@tiptap/extension-heading";
import {
    Typography,
    MenuItem,
    Select,
    SelectChangeEvent,
    SxProps,
    Theme,
    MenuItemProps,
} from "@mui/material";
import { useEditorContext } from "../context";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TranslationType } from "@/types/translation";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Variant } from "@mui/material/styles/createTypography";

// ----------------------------------------------------------------------------

const SelectSx: SxProps<Theme> = {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
};

// ----------------------------------------------------------------------------

const getLabel = (t: TranslationType, mini: boolean, v: number) => {
    if (mini) {
        return v === 0 ? t("Normal") : v === 7 ? t("BlockQuote") : `H${v}`;
    }

    return v === 0 ? t("Normal") : v === 7 ? t("BlockQuote") : t(`Heading${v}`);
};

interface RendeValueProps {
    mini?: boolean;
    v: number;
}

const RenderValue: FC<RendeValueProps> = ({ mini = false, v }) => {
    const { t } = useTranslation();

    const label = getLabel(t, mini, v);
    const variant = mini
        ? undefined
        : v !== 0 && v !== 7
        ? (`h${v}` as Variant)
        : undefined;

    return (
        <Typography variant={variant}>
            {label}
            {v === 7 ? <FormatQuoteIcon /> : null}
        </Typography>
    );
};

// ----------------------------------------------------------------------------

const renderValue = (v: number) => <RenderValue mini v={v} />;

// ----------------------------------------------------------------------------

interface OptionProps extends Omit<MenuItemProps, "value" | "children"> {
    value: number;
    v: number;
}

const Option: FC<OptionProps> = ({ v, ...props }) => (
    <MenuItem {...props}>
        <RenderValue v={v} />
    </MenuItem>
);

// -----------------------------------------------------------------------------

const TextFormatSelect = () => {
    const { editor } = useEditorContext();

    const getCurrentValue = useCallback(() => {
        if (editor?.isActive("blockquote")) return 7;

        for (let level = 1; level <= 6; level++) {
            if (editor?.isActive("heading", { level })) {
                return level;
            }
        }

        return 0; // Normal text
    }, [editor?.isActive]);

    const handleChange = (event: SelectChangeEvent<number>) => {
        if (!editor) return;

        const value = Number(event.target.value);

        switch (value) {
            case 0:
                editor.chain().focus().setParagraph().run();
                break;
            case 7:
                editor.chain().focus().toggleBlockquote().run();
                break;
            default:
                editor
                    .chain()
                    .focus()
                    .setHeading({ level: value as Level })
                    .run();
                break;
        }
    };

    return (
        <Select
            sx={SelectSx}
            size="small"
            renderValue={renderValue}
            value={getCurrentValue()}
            onChange={handleChange}
        >
            <Option value={0} v={0} />
            <Option value={1} v={1} />
            <Option value={2} v={2} />
            <Option value={3} v={3} />
            <Option value={4} v={4} />
            <Option value={5} v={5} />
            <Option value={6} v={6} />
            <Option value={7} v={7} />
        </Select>
    );
};

export default TextFormatSelect;
