import useDialog from "@/hooks/useDialog";
import FiltersBar from "./FiltersBar";
import { AgreementsFiltersProvider } from "./FiltersBar/FiltersContext";
import Stack from "@mui/material/Stack";
import CardsContent from "./Content";
import { Suspense, lazy } from "react";
const PreparationDialog = lazy(() => import("./Dialogs/Preparation"));
const PDFEditorDialog = lazy(() => import("./Dialogs/PDFEditor"));

interface Props {
    propertyId?: number;
}

const AgreementsSection: React.FC<Props> = ({ propertyId }) => {
    const [isPreparationOpen, openPreparation, closePreparation] = useDialog();
    const [isPDFOpen, openPDF, closePDF] = useDialog();

    const handleSave = () => {
        closePreparation();
        openPDF();
    };

    return (
        <>
            <AgreementsFiltersProvider>
                <Stack spacing={1}>
                    <FiltersBar onClickNew={openPreparation} />
                    <CardsContent propertyId={propertyId} />
                </Stack>
            </AgreementsFiltersProvider>

            <Suspense>
                {isPreparationOpen ? (
                    <PreparationDialog
                        open
                        onSave={handleSave}
                        onClose={closePreparation}
                    />
                ) : null}

                {isPDFOpen ? (
                    <PDFEditorDialog
                        open
                        variant={"basic"}
                        onClose={closePDF}
                    />
                ) : null}
            </Suspense>
        </>
    );
};

export default AgreementsSection;
