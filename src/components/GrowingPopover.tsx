import {
    Box,
    BoxProps,
    Popover,
    PopoverProps,
    SxProps,
    Theme,
    useTheme,
} from "@mui/material";
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

interface HeaderContainerProps extends BoxProps {
    openerWidth: number;
}

const HeaderContainer: FC<HeaderContainerProps> = ({
    openerWidth,
    ...props
}) => {
    const theme = useTheme();
    const spacing = theme.spacing;

    const mr = `calc(${openerWidth}px - ${spacing(1)}`;

    return <Box mr={mr} width="fit-content" {...props} />;
};

const POPOVER_INDEX = 200;

const getOpenerSx = (isOpen: boolean): SxProps<Theme> => ({
    position: "absolute",
    zIndex: isOpen ? POPOVER_INDEX : "initial",
    mt: isOpen ? 1 : 0,

    transition: (theme) =>
        theme.transitions.create(["margin-top"], {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.easeInOut,
        }),
});

interface OpenerProps {
    sx: SxProps<Theme>;
}

interface GrowingPopover<T extends OpenerProps = OpenerProps>
    extends Omit<PopoverProps, "anchorEl" | "open" | "onClose"> {
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
    const openerWidth = openerRef.current?.clientWidth ?? 40;

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
                <Opener ref={openerRef} sx={getOpenerSx(isOpen)} />
            </Box>

            <Popover
                anchorEl={anchorRef.current}
                open={isOpen}
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
                            zIndex: POPOVER_INDEX - 1,
                            ...((slotProps?.root as any)?.sx || {}),
                        },
                    },
                    paper: {
                        ...(slotProps?.paper || {}),
                        sx: {
                            mt: -1,
                            right: 15,
                            ...((slotProps?.paper as any)?.sx || {}),
                        },
                    },
                }}
                onClose={closePopover}
                {...other}
            >
                <HeaderContainer openerWidth={openerWidth}>
                    <HeadContentLeft />
                </HeaderContainer>

                {children}
            </Popover>
        </>
    );
};

export default GrowingPopover;
