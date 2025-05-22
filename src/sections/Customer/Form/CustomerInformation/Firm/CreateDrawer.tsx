import { FC, useCallback } from "react";
import { Drawer } from "@mui/material";
import FirmForm from "@/sections/Firm/Form";
import { useFormContext, useWatch } from "react-hook-form";
import { IFirmReq } from "@/types/firm";
import { makeStickyBottom } from "@/ui/FormBottomBar";

interface FirmCreateDrawerProps {
    onClose: VoidFunction;
}

const FirmCreateDrawer: FC<FirmCreateDrawerProps> = ({ onClose }) => {
    const oldIds =
        (useWatch<IFirmReq>({ name: "customers" }) as number[]) ?? [];
    const { setValue } = useFormContext<IFirmReq>();

    const onCreate = useCallback(
        (id: number) =>
            setValue("customers", [...oldIds, id], { shouldDirty: true }),
        [oldIds]
    );

    return (
        <Drawer
            open
            anchor="right"
            disablePortal
            PaperProps={{
                sx: {
                    zIndex: 3,

                    width: {
                        xs: "100vw",
                        lg: "30vw",
                    },

                    ...makeStickyBottom,
                },
            }}
            onClose={onClose}
        >
            <FirmForm createAssign onCreate={onCreate} onCancel={onClose} />
        </Drawer>
    );
};

export default FirmCreateDrawer;
