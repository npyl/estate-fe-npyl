import { Theme } from "@mui/material";
import Stack, { StackProps } from "@mui/material/Stack";
import { FC, ReactNode } from "react";

const BLACK = "0px 0px 4px -2px rgba(255,255,255,1)";
const WHITE = "0px 0px 6px -2px rgba(0,0,0,1)";

const getBoxShadow = ({ palette: { mode } }: Theme) =>
    mode === "dark" ? BLACK : WHITE;

interface FormBottomBarProps extends Omit<StackProps, "children"> {
    contentLeft: ReactNode;
    contentRight: ReactNode;
}

const FormBottomBar: FC<FormBottomBarProps> = ({
    contentLeft,
    contentRight,
    ...props
}) => {
    const hasLeft = Boolean(contentLeft);
    const justifyContent = hasLeft ? "space-between" : "flex-end";

    return (
        <Stack
            mt={1}
            spacing={1}
            boxShadow={getBoxShadow}
            borderRadius={1}
            bgcolor="background.paper"
            width={1}
            p={1}
            position="sticky"
            zIndex={1000}
            bottom={0}
            // ...
            direction="row"
            alignItems="center"
            justifyContent={justifyContent}
            // ...
            {...props}
        >
            {contentLeft}
            {contentRight}
        </Stack>
    );
};

export type { FormBottomBarProps };
export default FormBottomBar;
