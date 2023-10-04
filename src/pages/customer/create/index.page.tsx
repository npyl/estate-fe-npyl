import { Box, Button, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { usePublishTab } from "src/components/Tabs/utils";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useCreateCustomerMutation } from "src/services/customers";

const CreateCustomer: NextPage = () => {
    const router = useRouter();
    const [createCustomer] = useCreateCustomerMutation();
    const [startCreation, setStartCreation] = useState(false);

    const handleCreateButtonClick = () => {
        setStartCreation(true);
    };

    useEffect(() => {
        if (!startCreation) return;

        createCustomer() // create customer
            .unwrap()
            .then((id) => router.push(`/customer/edit/${id}`)) // redirect
            .catch((reason) => toast.error("Failed to create customer!"));
    }, [startCreation]);

    return (
        <Box
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
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCreateButtonClick}
            >
                Create Customer
            </Button>
        </Box>
    );
};

CreateCustomer.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CreateCustomer;
