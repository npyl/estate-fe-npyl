import { Popover, SxProps, Theme } from "@mui/material";
import type { SuggestionProps } from "@tiptap/suggestion";
import { FC, useCallback } from "react";
import { IUser } from "@/types/user";
import { MentionNodeAttrs } from "./types";
import Content from "./Content";

const PaperSx: SxProps<Theme> = {
    overflow: "hidden",
    maxHeight: "300px",
    overflowY: "auto",

    py: 1,
};

// Default DOMRect for positioning fallback
const DOM_RECT_FALLBACK: DOMRect = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    toJSON() {
        return {};
    },
};

type SuggestionListProps = Omit<SuggestionProps<IUser>, "items"> & {
    onClose: VoidFunction;
};

const SuggestionList: FC<SuggestionListProps> = ({
    query,
    command,
    onClose,
    ...props
}) => {
    const virtualReference = {
        getBoundingClientRect: () => props.clientRect?.() ?? DOM_RECT_FALLBACK,
        nodeType: 1,
    } as any;

    const onSelect = useCallback(
        (i: MentionNodeAttrs) => {
            // there is currently a bug in the Tiptap SuggestionProps
            // type where if you specify the suggestion type (like
            // `SuggestionProps<MentionSuggestion>`), it will incorrectly require that
            // type variable for `command`'s argument as well (whereas instead the
            // type of that argument should be the Mention Node attributes). This
            // should be fixed once https://github.com/ueberdosis/tiptap/pull/4136 is
            // merged and we can add a separate type arg to `SuggestionProps` to
            // specify the type of the commanded selected item.
            command(i);
        },
        [command]
    );

    return (
        <Popover
            open
            onClose={onClose}
            anchorEl={virtualReference}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            slotProps={{
                paper: {
                    sx: PaperSx,
                },
            }}
        >
            <Content query={query} onSelect={onSelect} />
        </Popover>
    );
};

SuggestionList.displayName = "SuggestionList";

export type { SuggestionListProps };
export default SuggestionList;
