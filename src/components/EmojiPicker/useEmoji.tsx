import BaseEmoji from "./Emoji";
import { EmojiPickerListEmojiProps } from "frimousse";
import { MouseEvent, RefObject, useCallback } from "react";
import { TooltipRef } from "./Tooltip";

const useEmoji = (tooltipRef: RefObject<TooltipRef>) =>
    useCallback(
        ({
            onMouseEnter: _onMouseEnter,
            onMouseLeave: _onMouseLeave,
            ...props
        }: EmojiPickerListEmojiProps) => {
            const onMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
                _onMouseEnter?.(e);

                const anchorEl = e.currentTarget;
                const label = props.emoji.label;
                const data = { anchorEl, label };
                tooltipRef.current?.show(data);
            };

            const onMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
                _onMouseLeave?.(e);
                tooltipRef.current?.close();
            };

            return (
                <BaseEmoji
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    {...props}
                />
            );
        },
        []
    );

export default useEmoji;
