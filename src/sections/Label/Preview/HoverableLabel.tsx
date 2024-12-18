import { IconButton, SxProps, Theme } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { Label, LabelProps } from "@/components/Label";
import DeleteButton from "./DeleteButton";
import { LabelResourceType } from "@/types/label";

const LabelSx: SxProps<Theme> = {
    position: "relative",

    "& .pp-label-controls": {
        position: "absolute",
        right: -75,
        visibility: "hidden",
    },

    "&:hover .pp-label-controls": {
        visibility: "visible",
    },
};

interface HoverableLabelProps extends LabelProps {
    variant: LabelResourceType;
    labelId: number;
    onEdit: VoidFunction;
}

const HoverableLabel = ({
    labelId,
    variant,
    onEdit,
    children,
    sx,
    ...props
}: HoverableLabelProps) => (
    <Label sx={{ ...LabelSx, ...sx }} {...props}>
        {children}

        <div className="pp-label-controls">
            <IconButton onClick={onEdit}>
                <EditIcon fontSize="small" />
            </IconButton>
            <DeleteButton variant={variant} labelId={labelId} />
        </div>
    </Label>
);

export default HoverableLabel;
