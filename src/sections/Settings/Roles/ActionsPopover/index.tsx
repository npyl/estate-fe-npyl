import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { TClickCb } from "./types";
import Popover from "./Popover";

interface DialogData {
    anchorEl: HTMLDivElement;
    roleId: number;
}

interface ActionsDialogRef {
    open: TClickCb;
}

const ActionsDialog = forwardRef<ActionsDialogRef, {}>((_, ref) => {
    const [data, setData] = useState<DialogData>();

    const open: TClickCb = useCallback((e, roleId) => {
        const anchorEl = e.currentTarget;
        setData({ anchorEl, roleId });
    }, []);
    const close = useCallback(() => setData(undefined), []);

    useImperativeHandle(ref, () => ({ open }), []);

    if (!data?.anchorEl) return null;

    return (
        <Popover
            anchorEl={data.anchorEl}
            roleId={data.roleId}
            onClose={close}
        />
    );
});

export type { ActionsDialogRef };
export default ActionsDialog;
