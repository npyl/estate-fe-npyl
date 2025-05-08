import { SpaceBetween } from "@/components/styled";
import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Paper, { PaperProps } from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { ReactNode } from "react";

const FiltersBarSx: SxProps<Theme> = {
    position: "sticky",
    top: 64,
    zIndex: 2,
};

interface FiltersBarProps extends Omit<PaperProps, "component"> {
    filters: ReactNode;
    controls?: ReactNode;
    bottomContent: ReactNode;
}

const FiltersBar: React.FC<FiltersBarProps> = ({
    filters,
    controls,
    bottomContent,
    sx,
    ...props
}) => (
    <Paper
        component={Stack}
        p={1}
        pt={0} // NOTE: paddingTop must come from the components so that the label that shrinks on top is visible
        spacing={1}
        sx={{ ...FiltersBarSx, ...sx }}
        {...props}
    >
        <SpaceBetween>
            <Stack
                alignItems="center"
                direction="row"
                spacing={0.3}
                pt={1}
                overflow="auto hidden"
                mb="-5px" // INFO: helps scrollbar not cause a layout shift
            >
                {filters}
            </Stack>
            {controls ? <Box mt={1}>{controls}</Box> : null}
        </SpaceBetween>

        {bottomContent}
    </Paper>
);

export default FiltersBar;
