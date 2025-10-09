import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { TClickCb } from "../types";
import { LabelResourceType } from "@/types/label";
import Popover from "./Popover";

interface DialogData {
    anchorEl: HTMLDivElement;
    labelId: number;
}

interface ActionsDialogRef {
    open: TClickCb;
}

interface ActionsDialogProps {
    resource: LabelResourceType;
}

const ActionsDialog = forwardRef<ActionsDialogRef, ActionsDialogProps>(
    ({ resource }, ref) => {
        const [data, setData] = useState<DialogData>();

        const open: TClickCb = useCallback((e, labelId) => {
            const anchorEl = e.currentTarget;
            setData({ anchorEl, labelId });
        }, []);
        const close = useCallback(() => setData(undefined), []);

        useImperativeHandle(ref, () => ({ open }), []);

        if (!data?.anchorEl) return null;

        return (
            <Popover
                anchorEl={data.anchorEl}
                resource={resource}
                labelId={data.labelId}
                onClose={close}
            />
        );
    }
);

export type { ActionsDialogRef };
export default ActionsDialog;
