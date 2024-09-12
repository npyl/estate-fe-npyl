import Label from "@/components/Label/Label";
import { ILabel } from "@/types/label";
import Stack from "@mui/material/Stack";
import { GridCellParams } from "@mui/x-data-grid";
import MoreChip from "@/components/Label/MoreChip";
import PreventDefault from "./PreventDefault";

const RenderLabelsCell = (params: GridCellParams) => {
    if (!params.value || !Array.isArray(params.value)) return null;

    const labels: ILabel[] = params.value as ILabel[];

    const more = labels.slice(2).length;

    return (
        <Stack spacing={0.5} alignItems="center">
            {labels.slice(0, 2).map(({ id, color, name }) => (
                <Label key={id} color={color} name={name} />
            ))}

            {more > 0 ? (
                <PreventDefault>
                    <MoreChip
                        label={`+${more} more`}
                        labels={labels}
                        sx={{ width: "min-content" }}
                    />
                </PreventDefault>
            ) : null}
        </Stack>
    );
};

export default RenderLabelsCell;
