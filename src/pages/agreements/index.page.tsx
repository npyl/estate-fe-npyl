import { AuthGuard } from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { NextPage } from "next";
import PreparationDialog from "./Dialogs/Preparation";
import useDialog from "@/hooks/useDialog";
import PDFEditorDialog from "./Dialogs/PDFEditor";
import FiltersBar from "./FiltersBar";

const AgreementsPage: NextPage = () => {
    const [isPreparationOpen, openPreparation, closePreparation] = useDialog();
    const [isPDFOpen, openPDF, closePDF] = useDialog();

    const handleSave = () => {
        closePreparation();
        openPDF();
    };

    return (
        <>
            <FiltersBar onClickNew={openPreparation} />

            {isPreparationOpen ? (
                <PreparationDialog
                    open={true}
                    onSave={handleSave}
                    onClose={closePreparation}
                />
            ) : null}

            {isPDFOpen ? (
                <PDFEditorDialog
                    open={true}
                    variant={"basic"}
                    onClose={closePDF}
                />
            ) : null}
        </>
    );
};

AgreementsPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default AgreementsPage;
