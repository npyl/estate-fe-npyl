import { Grid } from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import Create from "./components/Create";
import Preview from "./components/Preview";
import { IEditProps } from "./components/Preview/types";
import dynamic from "next/dynamic";
const Edit = dynamic(() => import("./components/Edit"));

const LabelsPage: NextPage = () => {
    const [editedLabel, setEditedLabel] = useState<IEditProps>();
    const cancelEdit = () => setEditedLabel(undefined);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
                {editedLabel ? (
                    <Edit editedLabel={editedLabel} cancelEdit={cancelEdit} />
                ) : (
                    <Create />
                )}
            </Grid>

            <Grid item xs={12} md={6}>
                <Preview onEdit={setEditedLabel} />
            </Grid>
        </Grid>
    );
};

LabelsPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default LabelsPage;
