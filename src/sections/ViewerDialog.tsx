import { FC } from "react";
import Dialog, { DialogProps } from "@/components/Dialog";
import Viewer, { ViewerProps } from "./Viewer";

type ViewerDialogProps = Omit<DialogProps, "open"> & ViewerProps;

const ViewerDialog: FC<ViewerDialogProps> = ({ mimeType, url, ...props }) => (
    <Dialog
        open
        maxWidth="md"
        fullWidth
        hideTitle
        content={<Viewer url={url} mimeType={mimeType} />}
        {...props}
    />
);

export default ViewerDialog;
