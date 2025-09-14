import { IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";
import useDialog from "@/hooks/useDialog";
import { ChevronDown } from "@/assets/icons/chevron-down";
import { getBorderColor2 } from "@/theme/borderColor";
import dynamic from "next/dynamic";
import { FC, PropsWithChildren, useRef } from "react";
const Popover = dynamic(() => import("./Popover"));

const CountsPopover: FC<PropsWithChildren> = ({ children }) => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isOpen, open, close] = useDialog();
    return (
        <Stack width={1 / 3} justifyContent="center" alignItems="center">
            <IconButton
                ref={anchorRef}
                onClick={open}
                size="small"
                sx={{
                    border: "1px solid",
                    borderColor: getBorderColor2,
                    borderRadius: "100%",
                }}
            >
                <ChevronDown />
            </IconButton>

            {isOpen && anchorRef.current ? (
                <Popover anchorEl={anchorRef.current} onClose={close}>
                    {children}
                </Popover>
            ) : null}
        </Stack>
    );
};

export default CountsPopover;
