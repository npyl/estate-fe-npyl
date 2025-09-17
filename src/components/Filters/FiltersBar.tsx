import { SpaceBetween } from "@/components/styled";
import { SxProps, Theme } from "@mui/material";
import Stack, { StackProps } from "@mui/material/Stack";
import { ReactNode } from "react";
import HorizontalScrollbar from "../HorizontalScrollbar";

const FiltersBarSx: SxProps<Theme> = {
    position: "sticky",
    top: ({ layout }) => layout.nav.topbarHeight,
    zIndex: ({ zIndex }) => zIndex.filtersBar,
    backgroundColor: "background.paper",
    boxShadow: 15,
    borderRadius: 1,
};

interface FiltersBarProps extends Omit<StackProps, "component"> {
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
    <Stack
        p={1}
        pt={0} // NOTE: paddingTop must come from the components so that the label that shrinks on top is visible
        gap={0.5}
        sx={{ ...FiltersBarSx, ...sx }}
        {...props}
    >
        <SpaceBetween alignItems="center" gap={2}>
            <HorizontalScrollbar spacing={0.5}>{filters}</HorizontalScrollbar>
            <Stack mt={1} direction="row" alignItems="center">
                {controls}
            </Stack>
        </SpaceBetween>
        {bottomContent}
    </Stack>
);

export type { FiltersBarProps };
export default FiltersBar;
