import MuiMenu from "@mui/material/Menu";
import { Level } from "@tiptap/extension-heading";
import {
    Typography,
    MenuItem,
    MenuItemProps,
    TypographyProps,
} from "@mui/material";
import { useEditorContext } from "@/components/Editor/context";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TranslationType } from "@/types/translation";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Variant } from "@mui/material/styles/createTypography";
import useCurrentValue from "./useCurrentValue";
import TextIcon from "@/assets/icons/text";

// ----------------------------------------------------------------------------

/**
 * Basically theme's halves
 */
const getFontSize = (mini: boolean, v: number) => {
    if (mini) return;

    switch (v) {
        case 0: // Normal text
        case 7: // Blockquote
            return "1rem";
        case 1: // h1
            return "1.5rem";
        case 2: // h2
            return "1.25rem";
        case 3: // h3
            return "1.125rem";
        case 4: // h4
            return "1rem";
        case 5: // h5
            return "0.9375rem";
        case 6: // h6
            return "0.875rem";
        default:
            return "0.875rem";
    }
};

const getLabel = (t: TranslationType, mini: boolean, v: number) => {
    if (mini) return v === 0 || v === 7 ? null : `H${v}`;
    return v === 0 ? t("Normal") : v === 7 ? t("BlockQuote") : t(`Heading${v}`);
};

interface RendeValueProps extends TypographyProps {
    mini?: boolean;
    v: number;
}

const RenderValue: FC<RendeValueProps> = ({ mini = false, v, ...props }) => {
    const { t } = useTranslation();

    const label = getLabel(t, mini, v);

    const variant = mini
        ? undefined
        : v !== 0 && v !== 7
        ? (`h${v}` as Variant)
        : undefined;

    const fontSize = getFontSize(mini, v);

    return (
        <Typography variant={variant} style={{ fontSize }} {...props}>
            {label}
            {v === 0 && mini ? <TextIcon width={20} height={20} /> : null}
            {v === 7 ? <FormatQuoteIcon fontSize="small" /> : null}
        </Typography>
    );
};

// ----------------------------------------------------------------------------

interface OptionProps
    extends Omit<MenuItemProps, "value" | "selected" | "onClick" | "children"> {
    value: number;
    v: number;
}

const Option: FC<OptionProps> = ({ v, ...props }) => {
    const { editor } = useEditorContext();

    const onClick = useCallback(() => {
        if (!editor) return;

        switch (v) {
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
                    .setHeading({ level: v as Level })
                    .run();
                break;
        }
    }, [v]);

    const value = useCurrentValue();
    const selected = v === value;

    return (
        <MenuItem
            onClick={onClick}
            selected={selected}
            sx={{ height: "40px" }}
            {...props}
        >
            <RenderValue v={v} />
        </MenuItem>
    );
};

const Content = () => (
    <>
        <Option value={0} v={0} />
        <Option value={1} v={1} />
        <Option value={2} v={2} />
        <Option value={3} v={3} />
        <Option value={4} v={4} />
        <Option value={5} v={5} />
        <Option value={6} v={6} />
        <Option value={7} v={7} />
    </>
);

export { RenderValue };
export default Content;
