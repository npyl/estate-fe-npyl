import { FC, ReactNode } from "react";
import MuiClickAwayListener, {
    ClickAwayListenerProps as MuiClickAwayListenerProps,
} from "@mui/material/ClickAwayListener";

interface ClickAwayListenerProps
    extends Omit<MuiClickAwayListenerProps, "children" | "onClickAway"> {
    children: ReactNode;
    onClickAway: VoidFunction;
}

const ClickAwayListener: FC<ClickAwayListenerProps> = ({
    children,
    ...props
}) => (
    <MuiClickAwayListener {...props}>
        <div>{children}</div>
    </MuiClickAwayListener>
);

export default ClickAwayListener;
