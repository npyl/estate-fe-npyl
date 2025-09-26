import useResponsive from "@/hooks/useResponsive";
import { Drawer, PopperProps as MuiPopperProps } from "@mui/material";
import { ComponentType, ReactNode } from "react";

type AnyPopper = ComponentType<MuiPopperProps>;

type PopperProps = Omit<MuiPopperProps, "children"> & {
    children: ReactNode;
};

/**
 * This wrapper ignores all props and opens a Drawer when below sm
 * @param Popper The MUI Popper that will be converted to Drawer below sm
 */
const WithResponsive = (Popper: AnyPopper) => {
    const Wrapper = (props: PopperProps) => {
        const { children } = props;

        const isDrawer = useResponsive("down", "sm");

        if (isDrawer)
            return (
                <Drawer open anchor="bottom">
                    <div>{children}</div>
                </Drawer>
            );

        return <Popper {...props} />;
    };

    Wrapper.displayName = "WithResponsive(Popper)";

    return Wrapper;
};

export default WithResponsive;
