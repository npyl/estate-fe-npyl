import { FC } from "react";
import Dialog, { DialogProps } from "@/components/Dialog";
import Viewer, { ViewerProps } from "./Viewer";

type ViewerDialogProps = Omit<DialogProps, "open"> & ViewerProps;

const ViewerDialog: FC<ViewerDialogProps> = ({ mimeType, url, ...props }) => (
    <Dialog open maxWidth="md" fullWidth {...props}>
        <Viewer url={url} mimeType={mimeType} />
    </Dialog>
);

export default ViewerDialog;
