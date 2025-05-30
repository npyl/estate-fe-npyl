import { FC } from "react";
import Dialog, { DialogProps } from "@/components/Dialog";
import Viewer, { ViewerProps } from "./Viewer";
import stopPropagation from "@/utils/stopPropagation";

type ViewerDialogProps = Omit<DialogProps, "open" | "onClick"> & ViewerProps;

const ViewerDialog: FC<ViewerDialogProps> = ({ mimeType, url, ...props }) => (
    <Dialog
        open
        fullWidth
        hideTitle
        content={<Viewer url={url} mimeType={mimeType} />}
        onClick={stopPropagation}
        {...props}
    />
);

export default ViewerDialog;
