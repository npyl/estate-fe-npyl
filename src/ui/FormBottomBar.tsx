import { SxProps, Theme } from "@mui/material";
import Stack, { StackProps } from "@mui/material/Stack";
import { FC, ReactNode } from "react";

const CLASSNAME = "PPFormBottomBar-bar";

const makeStickyBottom: SxProps<Theme> = {
    [`.${CLASSNAME}`]: {
        width: 1,
        position: "sticky",
        bottom: 0,
    },
};

// ----------------------------------------------------------------------------------------

const BLACK = "0px 0px 4px -2px rgba(255,255,255,1)";
const WHITE = "0px 0px 6px -2px rgba(0,0,0,1)";

const getBoxShadow = ({ palette: { mode } }: Theme) =>
    mode === "dark" ? BLACK : WHITE;

const getResponsiveWidth = ({ layout, spacing }: Theme) => {
    const mr = spacing(3);

    return {
        xs: `calc(100% - ${mr})`,
        md: `calc(100% - ${layout.nav.sidebarWidth}px - ${mr})`,
    };
};

// ----------------------------------------------------------------------------------------

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
        <>
            <Stack height="54px" my={1} />

            <Stack
                className={CLASSNAME}
                spacing={1}
                boxShadow={getBoxShadow}
                borderRadius={1}
                bgcolor="background.paper"
                width={getResponsiveWidth}
                p={1}
                position="fixed"
                zIndex={1000}
                bottom={10}
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
        </>
    );
};

export { makeStickyBottom };
export type { FormBottomBarProps };
export default FormBottomBar;
