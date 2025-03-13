import useDialog from "@/hooks/useDialog";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { FC, forwardRef, useCallback, useMemo, useRef } from "react";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import dynamic from "next/dynamic";
import { useEditorContext } from "../../context";
import Stack from "@mui/material/Stack";
import { getBubbleSx } from "../styled";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
const Popover = dynamic(() => import("./Popover"));

// ------------------------------------------------------------------

const OpenHrefButton = () => {
    const { editor } = useEditorContext();
    const href = editor?.getAttributes("link").href || "";

    const onOpenHref = useCallback(() => {
        window.open(href, "_blank");
    }, [href]);

    if (!href) return null;

    return (
        <IconButton onClick={onOpenHref}>
            <OpenInNewIcon />
        </IconButton>
    );
};

// ------------------------------------------------------------------

const LinkButton = forwardRef<
    HTMLButtonElement,
    Omit<IconButtonProps, "disabled">
>((props, ref) => {
    const { editor } = useEditorContext();

    const notRange = useMemo(() => {
        const state = editor?.state;
        if (!state) return true;

        const selection = state.selection;
        if (!selection) return true;

        const { to, from } = selection;

        const res = state.doc.textBetween(from, to, " ");

        return res.length === 0;
    }, [editor?.state?.selection]);

    return (
        <IconButton ref={ref} disabled={notRange} {...props}>
            <InsertLinkIcon />
        </IconButton>
    );
});

// ------------------------------------------------------------------

interface LinkProps {
    bubble?: boolean;
}

const Link: FC<LinkProps> = ({ bubble = false }) => {
    const [isOpen, openPopover, closePopover] = useDialog();
    const anchorRef = useRef<HTMLButtonElement>(null);

    return (
        <Stack
            direction="row"
            alignItems="center"
            // ...
            spacing={1}
            // ...
            sx={getBubbleSx(bubble)}
        >
            <LinkButton ref={anchorRef} onClick={openPopover} />

            {bubble ? <OpenHrefButton /> : null}

            {isOpen && anchorRef.current ? (
                <Popover anchorEl={anchorRef.current} onClose={closePopover} />
            ) : null}
        </Stack>
    );
};

export default Link;
