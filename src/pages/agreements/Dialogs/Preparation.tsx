// Fill-in basic information for property, customer, etc.

import Dialog, { DialogProps } from "@/components/Dialog";
import { Button, Typography } from "@mui/material";

interface Props extends DialogProps {
    onSave: () => void;
}

const PreparationDialog: React.FC<Props> = ({ onSave, ...props }) => (
    <Dialog
        {...props}
        title={<Typography>Agreement</Typography>}
        content={<></>}
        actions={
            <>
                <Button onClick={props.onClose}>Close</Button>
                <Button onClick={onSave}>Save</Button>
            </>
        }
    />
);

export default PreparationDialog;
