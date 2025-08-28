import SendIcon from "@mui/icons-material/Send";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
    SecurityProvider,
    useSecurityContext,
} from "@/sections/Settings/permission/Context";
import { useSaveRelationshipMutation } from "@/services/security";
import PermissionsTable from "./PermissionsTable";
import SeparatePermissions from "./SeparatePermissions";
import Sidebar from "./Sidebar";

const PermissionPage: FC = () => {
    const { t } = useTranslation();

    const [saveRelationship, { isLoading }] = useSaveRelationshipMutation();

    const { data, targetUser, selectedUser, isFetching } = useSecurityContext();

    return (
        <>
            <Grid container spacing={2}>
                {/* Left sticky box */}
                <Grid xs={12} lg={2}>
                    <Box position={{ xs: "unset", lg: "sticky" }} top={70}>
                        <Sidebar />
                    </Box>
                </Grid>

                {/* Right PermissionsTable */}
                <Grid item xs={12} lg={10} spacing={1} width={1}>
                    <SeparatePermissions />
                    <Box mt={1} />
                    <PermissionsTable />
                </Grid>
            </Grid>

            <Stack py={2} spacing={2} direction={"row"} sx={{ float: "right" }}>
                <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    disabled={
                        selectedUser === -1 ||
                        targetUser === -1 ||
                        isFetching ||
                        isLoading
                    }
                    onClick={() => saveRelationship(data)}
                >
                    {t("Apply Changes")}
                </Button>
            </Stack>
        </>
    );
};

const Wrapped = () => (
    <SecurityProvider>
        <PermissionPage />
    </SecurityProvider>
);

export default Wrapped;
