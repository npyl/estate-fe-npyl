import { SpaceBetween } from "@/components/styled";
import Box from "@mui/material/Box";
import Paper, { PaperProps } from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { ReactNode } from "react";

interface FiltersBarProps extends PaperProps {
    filters: ReactNode;
    controls: ReactNode;
    bottomContent: ReactNode;
}

const FiltersBar: React.FC<FiltersBarProps> = ({
    filters,
    controls,
    bottomContent,
    ...props
}) => (
    <Paper
        {...props}
        component={Stack}
        p={1}
        // NOTE: paddingTop must come from the components so that the label that shrinks on top is visible
        pt={0}
    >
        <SpaceBetween>
            <Stack
                direction="row"
                spacing={0.3}
                pt={1}
                overflow="auto hidden"
                mb="-5px" // INFO: helps scrollbar not cause a layout shift
            >
                {filters}
            </Stack>
            <Box mt={1}>{controls}</Box>
        </SpaceBetween>

        {bottomContent}
    </Paper>
);

export default FiltersBar;
