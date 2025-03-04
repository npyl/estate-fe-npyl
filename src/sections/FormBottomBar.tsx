import Stack, { StackProps } from "@mui/material/Stack";
import { FC, ReactNode } from "react";

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
            spacing={1}
            borderRadius={1}
            bgcolor="background.neutral"
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
