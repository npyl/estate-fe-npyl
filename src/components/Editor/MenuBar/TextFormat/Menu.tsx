import MuiMenu from "@mui/material/Menu";
import { Level } from "@tiptap/extension-heading";
import { Typography, MenuItem, MenuItemProps } from "@mui/material";
import { useEditorContext } from "@/components/Editor/context";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TranslationType } from "@/types/translation";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Variant } from "@mui/material/styles/createTypography";
import useCurrentValue from "./useCurrentValue";

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
        <MenuItem onClick={onClick} selected={selected} {...props}>
            <RenderValue v={v} />
        </MenuItem>
    );
};

// -------------------------------------------------------------------------

interface MenuProps {
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const Menu: FC<MenuProps> = ({ anchorEl, onClose }) => (
    <MuiMenu open anchorEl={anchorEl} onClose={onClose}>
        <Option value={0} v={0} />
        <Option value={1} v={1} />
        <Option value={2} v={2} />
        <Option value={3} v={3} />
        <Option value={4} v={4} />
        <Option value={5} v={5} />
        <Option value={6} v={6} />
        <Option value={7} v={7} />
    </MuiMenu>
);

export { RenderValue };
export default Menu;
