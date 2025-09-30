import { Grid } from "@mui/material";
import { SecurityProvider } from "@/sections/Settings/permission/Context";
import PermissionsTable from "./PermissionsTable";
import SeparatePermissions from "./SeparatePermissions";
import Sidebar from "./Sidebar";

const PermissionPage = () => (
    <>
        <SeparatePermissions />

        <Grid container spacing={1} mt={1}>
            {/* Left sticky box */}
            <Grid xs={12} lg={2}>
                <Sidebar position={{ xs: "unset", lg: "sticky" }} top={70} />
            </Grid>

            {/* Right PermissionsTable */}
            <Grid item xs={12} lg={10}>
                <PermissionsTable />
            </Grid>
        </Grid>
    </>
);

const Wrapped = () => (
    <SecurityProvider>
        <PermissionPage />
    </SecurityProvider>
);

export default Wrapped;
