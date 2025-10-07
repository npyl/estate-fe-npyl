import { FC, ReactNode } from "react";
import Stack from "@mui/material/Stack";
import ClickAwayListener, {
    ClickAwayListenerProps,
} from "@mui/material/ClickAwayListener";

interface ContainerProps extends Omit<ClickAwayListenerProps, "children"> {
    children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children, ...props }) => (
    <ClickAwayListener {...props}>
        <Stack
            width="fit-content"
            alignItems="center"
            justifyContent="center"
            flexGrow={1}
        >
            {children}
        </Stack>
    </ClickAwayListener>
);

export default Container;
