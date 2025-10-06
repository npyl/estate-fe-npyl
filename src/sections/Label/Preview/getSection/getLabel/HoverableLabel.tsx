import { IconButton, SxProps, Theme } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { Label, LabelProps } from "@/components/Label";
import DeleteButton from "./DeleteButton";
import { LabelResourceType } from "@/types/label";

const LabelSx: SxProps<Theme> = {
    position: "relative",

    "& .pp-label-controls": {
        gap: 2,
        position: "absolute",
        right: -75,
        top: "50%",
        transform: "translateY(-50%)",
        visibility: "hidden",
        // Add an invisible extension to the left to increase hover area
        "&::before": {
            content: '""',
            position: "absolute",
            right: "100%",
            top: -8,
            bottom: -8,
            width: 20,
            background: "transparent",
        },
    },
    "&:hover .pp-label-controls, .pp-label-controls:hover": {
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
            <IconButton onClick={onEdit} sx={{ borderRadius: "100%" }}>
                <EditIcon fontSize="small" />
            </IconButton>
            <DeleteButton variant={variant} labelId={labelId} />
        </div>
    </Label>
);

export default HoverableLabel;
