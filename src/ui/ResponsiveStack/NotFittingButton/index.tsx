import { ChevronDown } from "@/assets/icons/chevron-down";
import useDialog from "@/hooks/useDialog";
import getBorderColor from "@/theme/borderColor";
import { IconButton, SxProps, Theme } from "@mui/material";
import { ButtonProps } from "@mui/material/Button";
import dynamic from "next/dynamic";
import { ReactNode, useCallback, MouseEvent } from "react";
import { useRef } from "react";
const Popover = dynamic(() => import("./Popover"));

const getSx = (hasOverflowing: boolean): SxProps<Theme> => ({
    visibility: hasOverflowing ? "visible" : "hidden",
    border: "1px solid",
    borderColor: getBorderColor,
    borderRadius: "100%",
});

interface NotFittingButtonProps extends Omit<ButtonProps, "onClick"> {
    overflowing: ReactNode[];
}

const NotFittingButton = ({
    overflowing,
    sx,
    ...props
}: NotFittingButtonProps) => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isOpen, open, close] = useDialog();

    const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        open();
    }, []);

    const hasOverflowing = overflowing.length > 0;

    return (
        <>
            <IconButton
                ref={anchorRef}
                sx={{ ...getSx(hasOverflowing), ...(sx as any) }}
                onClick={onClick}
                {...props}
            >
                <ChevronDown />
            </IconButton>

            {isOpen && anchorRef.current ? (
                <Popover
                    anchorEl={anchorRef.current}
                    onClose={close}
                    overflowing={overflowing}
                />
            ) : null}
        </>
    );
};

export default NotFittingButton;
