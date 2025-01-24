import { Box, Popover, PopoverProps, SxProps, Theme } from "@mui/material";
import {
    ComponentType,
    ForwardRefExoticComponent,
    PropsWithoutRef,
    RefAttributes,
    useLayoutEffect,
    useRef,
    type FC,
} from "react";
import useDialog from "@/hooks/useDialog";

const POPOVER_INDEX = 200;

interface OpenerProps {
    sx: SxProps<Theme>;
}

interface GrowingPopover<T extends OpenerProps = OpenerProps>
    extends Omit<PopoverProps, "open" | "onClose"> {
    HeadContentLeft: ComponentType;

    // INFO: the ref is mandatory
    Opener: ForwardRefExoticComponent<
        PropsWithoutRef<T> & RefAttributes<HTMLDivElement>
    >;
}

const GrowingPopover: FC<GrowingPopover> = ({
    HeadContentLeft,
    Opener,
    children,
    slotProps,
    ...other
}) => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [isOpen, openPopover, closePopover] = useDialog();

    const openerRef = useRef<HTMLDivElement>(null);

    // INFO: will be (intentionally) recalculated on isOpen-change
    const openerWidth = `${(openerRef.current?.clientWidth ?? 30) + 10}px`;

    useLayoutEffect(() => {
        if (!openerRef.current) return;
        if (!anchorRef.current) return;

        const width = openerRef.current.clientWidth;
        const height = openerRef.current.clientHeight;

        anchorRef.current.style.width = `${width}px`;
        anchorRef.current.style.height = `${height}px`;
    }, []);

    return (
        <>
            <Box onClick={openPopover} ref={anchorRef} position="relative">
                <Opener
                    ref={openerRef}
                    sx={{
                        position: "absolute",
                        zIndex: isOpen ? POPOVER_INDEX : "initial",
                        mt: isOpen ? 1 : 0,
                    }}
                />
            </Box>

            {isOpen ? (
                <Popover
                    open
                    disablePortal
                    anchorOrigin={{
                        horizontal: "right",
                        vertical: "top",
                    }}
                    transformOrigin={{
                        horizontal: "right",
                        vertical: "top",
                    }}
                    slotProps={{
                        ...slotProps,
                        root: {
                            ...(slotProps?.root || {}),
                            sx: {
                                mt: -1,
                                mr: -1,
                                zIndex: POPOVER_INDEX - 1,
                                ...((slotProps?.root as any)?.sx || {}),
                            },
                        },
                    }}
                    onClose={closePopover}
                    {...other}
                >
                    <Box mr={openerWidth} width="fit-content">
                        <HeadContentLeft />
                    </Box>

                    {children}
                </Popover>
            ) : null}
        </>
    );
};

export default GrowingPopover;
