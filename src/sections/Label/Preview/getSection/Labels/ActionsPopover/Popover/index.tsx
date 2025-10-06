import { FC } from "react";
import MuiPopover from "@mui/material/Popover";
import Content from "./Content";
import { LabelResourceType } from "@/types/label";

interface PopoverProps {
    anchorEl: HTMLDivElement;
    resource: LabelResourceType;
    labelId: number;
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({
    anchorEl,
    resource,
    labelId,
    onClose,
}) => (
    <MuiPopover
        open
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
            vertical: "center",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "center",
            horizontal: "left",
        }}
        slotProps={{
            paper: {
                sx: {
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                },
            },
        }}
    >
        <Content resource={resource} labelId={labelId} />
    </MuiPopover>
);

export default Popover;
