import FiltersBar from "./FiltersBar";
import { AgreementsFiltersProvider } from "./FiltersBar/FiltersContext";
import Stack from "@mui/material/Stack";
import CardsContent from "./Content";
import { useState } from "react";
import dynamic from "next/dynamic";
const PreparationDialog = dynamic(() => import("./Dialogs/Preparation"));

interface Props {
    // Are we on a property/[propertyId] page or the agreements page?
    propertyId?: number;
    customerId?: number;
}

const AgreementsSection: React.FC<Props> = ({ propertyId, customerId }) => {
    // -1: closed
    // 0: create
    // >0: edit with agreement id
    const [dialogMode, setDialogMode] = useState(-1);
    const openCreateDialog = () => setDialogMode(0);
    const openEditDialog = (id: number) => setDialogMode(id);
    const closeDialog = () => setDialogMode(-1);

    return (
        <>
            <AgreementsFiltersProvider>
                <Stack spacing={1}>
                    <FiltersBar
                        customer={!!customerId}
                        onClickNew={openCreateDialog}
                    />
                    <CardsContent
                        propertyId={propertyId}
                        customerId={customerId}
                        onEditAgreement={openEditDialog}
                    />
                </Stack>
            </AgreementsFiltersProvider>

            {dialogMode !== -1 ? (
                <PreparationDialog
                    open
                    editedAgreementId={dialogMode}
                    onClose={closeDialog}
                />
            ) : null}
        </>
    );
};

export default AgreementsSection;
