import FiltersBar from "./FiltersBar";
import { AgreementsFiltersProvider } from "./FiltersBar/FiltersContext";
import Stack from "@mui/material/Stack";
import CardsContent from "./Content";
import { Suspense, lazy, useState } from "react";
const PreparationDialog = lazy(() => import("./Dialogs/Preparation"));

interface Props {
    // Are we on a property/[propertyId] page or the agreements page?
    propertyId?: number;
}

const AgreementsSection: React.FC<Props> = ({ propertyId }) => {
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
                    <FiltersBar onClickNew={openCreateDialog} />
                    <CardsContent
                        propertyId={propertyId}
                        onEditAgreement={openEditDialog}
                    />
                </Stack>
            </AgreementsFiltersProvider>

            {dialogMode !== -1 ? (
                <Suspense>
                    <PreparationDialog
                        open
                        editedAgreementId={dialogMode}
                        onClose={closeDialog}
                    />
                </Suspense>
            ) : null}
        </>
    );
};

export default AgreementsSection;
