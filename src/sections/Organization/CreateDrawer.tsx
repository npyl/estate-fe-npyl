import { FC, useCallback } from "react";
import { Drawer } from "@mui/material";
import FirmForm from "@/sections/Organization/Form";
import { useFormContext, useWatch } from "react-hook-form";
import { IOrganization, IOrganizationReq } from "@/types/organization";
import { makeStickyBottom } from "@/ui/FormBottomBar";

interface OrganizationCreateDrawerProps {
    organization?: IOrganization;
    onClose: VoidFunction;
}

const OrganizationCreateDrawer: FC<OrganizationCreateDrawerProps> = ({
    organization,
    onClose,
}) => (
    <Drawer
        open
        anchor="right"
        disablePortal
        PaperProps={{
            sx: {
                zIndex: 3,

                p: 2,

                width: {
                    xs: "100vw",
                    lg: "30vw",
                },

                ...makeStickyBottom,
            },
        }}
        onClose={onClose}
    >
        <FirmForm
            organization={organization}
            createAssign
            onCreate={() => {}}
            onCancel={onClose}
        />
    </Drawer>
);

export default OrganizationCreateDrawer;
