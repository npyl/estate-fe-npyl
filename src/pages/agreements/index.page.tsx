import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { NextPage } from "next";
import PreparationDialog from "./Dialogs/Preparation";
import { Button, Stack, Typography } from "@mui/material";
import { SpaceBetween } from "@/components/styled";
import useDialog from "@/hooks/useDialog";
import PDFEditorDialog from "./Dialogs/PDFEditor";
import FiltersBar from "@/components/Filters/FiltersBar";

const AgreementsPage: NextPage = () => {
    const [isPreparationOpen, openPreparation, closePreparation] = useDialog();
    const [isPDFOpen, openPDF, closePDF] = useDialog();

    const [variant, setVariant] = useState<"basic" | "purchase" | "">("");

    const handleBasic = () => {
        setVariant("basic");
        openPreparation();
    };
    const handlePurchase = () => {
        setVariant("purchase");
        openPreparation();
    };

    const handleSave = () => {
        closePreparation();
        openPDF();
    };

    return (
        <>
            <FiltersBar>
                <SpaceBetween>
                    <Typography>Filters</Typography>

                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={handleBasic}
                        >
                            Basic
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={handlePurchase}
                        >
                            Purchase
                        </Button>
                    </Stack>
                </SpaceBetween>
            </FiltersBar>

            {isPreparationOpen ? (
                <PreparationDialog
                    open={true}
                    onSave={handleSave}
                    onClose={closePreparation}
                />
            ) : null}

            {isPDFOpen && variant ? (
                <PDFEditorDialog
                    open={true}
                    variant={variant}
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
