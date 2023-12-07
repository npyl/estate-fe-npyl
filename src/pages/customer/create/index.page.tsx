import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useCreateCustomerMutation } from "src/services/customers";
import { SaveButton } from "src/components/SaveButton";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";

const CreateCustomer: NextPage = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [createCustomer, { isError }] = useCreateCustomerMutation();

    const handleSave = () =>
        createCustomer() // create customer
            .unwrap()
            .then((id) => router.push(`/customer/edit/${id}`)) // redirect
            .catch((reason) => toast.error("Failed to create customer!"));

    return (
        <Box
            marginTop={4}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "140px",
            }}
        >
            <Typography variant="h3" gutterBottom>
                Create a New Customer
            </Typography>
            <SaveButton
                error={isError}
                loadingPosition="start"
                variant="contained"
                startIcon={<SendIcon />}
                onClick={handleSave}
            >
                {t("Save")}
            </SaveButton>
        </Box>
    );
};

CreateCustomer.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CreateCustomer;
