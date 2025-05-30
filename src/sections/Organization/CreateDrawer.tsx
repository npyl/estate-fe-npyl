import { FC } from "react";
import { Drawer } from "@mui/material";
import FirmForm from "@/sections/Organization/Form";
import { IOrganization } from "@/types/organization";
import { makeStickyBottom } from "@/ui/FormBottomBar";

interface OrganizationCreateDrawerProps {
    organization?: IOrganization;
    onCreate?: (id: number) => void;
    onClose: VoidFunction;
}

const OrganizationCreateDrawer: FC<OrganizationCreateDrawerProps> = ({
    organization,
    onCreate,
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
            onCreate={onCreate}
            onCancel={onClose}
        />
    </Drawer>
);

export default OrganizationCreateDrawer;
