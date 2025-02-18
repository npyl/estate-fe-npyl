import Label from "@/components/Label/Label";
import { ILabel } from "@/types/label";
import Stack from "@mui/material/Stack";
import { GridCellParams } from "@mui/x-data-grid";
import MoreChip from "@/components/Label/MoreChip";
import { Box, SxProps, Theme } from "@mui/material";

const LABEL_SX: SxProps<Theme> = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100%",
    display: "flex",
};

const RenderLabelsCell = (params: GridCellParams) => {
    if (!params.value || !Array.isArray(params.value)) return null;

    const labels: ILabel[] = params.value as ILabel[];

    const more = labels.slice(2).length;

    return (
        <Stack
            spacing={0.5}
            width={1}
            height={1}
            alignItems="center"
            justifyContent="center"
        >
            {labels.slice(0, 2).map(({ color, name }) => (
                <Box sx={{ maxWidth: 150, minWidth: 50, overflow: "hidden" }}>
                    <Label color={color} name={name} sx={LABEL_SX} />
                </Box>
            ))}

            {more > 0 ? (
                <MoreChip
                    label={`+${more} more`}
                    labels={labels}
                    sx={{ width: "min-content" }}
                />
            ) : null}
        </Stack>
    );
};

export default RenderLabelsCell;
