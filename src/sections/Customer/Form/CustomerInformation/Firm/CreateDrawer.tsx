import { FC, useCallback } from "react";
import { Drawer } from "@mui/material";
import FirmForm from "@/sections/Organization/Form";
import { useFormContext, useWatch } from "react-hook-form";
import { IOrganizationReq } from "@/types/organization";
import { makeStickyBottom } from "@/ui/FormBottomBar";

interface FirmCreateDrawerProps {
    onClose: VoidFunction;
}

const FirmCreateDrawer: FC<FirmCreateDrawerProps> = ({ onClose }) => {
    const oldIds =
        (useWatch<IOrganizationReq>({ name: "customers" }) as number[]) ?? [];
    const { setValue } = useFormContext<IOrganizationReq>();

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
