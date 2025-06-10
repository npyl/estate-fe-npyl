import { SpaceBetween } from "@/components/styled";
import { SxProps, Theme } from "@mui/material";
import Paper, { PaperProps } from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { ReactNode } from "react";
import HorizontalScrollbar from "../Scrollbar";

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
        gap={0.5}
        elevation={10}
        sx={{ ...FiltersBarSx, ...sx }}
        {...props}
    >
        <SpaceBetween alignItems="center" gap={0.5}>
            <HorizontalScrollbar spacing={0.5} pt={1}>
                {filters}
            </HorizontalScrollbar>
            <Stack mt={1} direction="row" alignItems="center">
                {controls}
            </Stack>
        </SpaceBetween>
        {bottomContent}
    </Paper>
);

export type { FiltersBarProps };
export default FiltersBar;
