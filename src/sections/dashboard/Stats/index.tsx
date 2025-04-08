import Grid from "@mui/material/Unstable_Grid2";
import Cards from "./Cards";
import IntegrationSites from "./IntegrationSites";
import Stack from "@mui/material/Stack";

const Stats = () => (
    <Stack spacing={2}>
        <Grid
            container
            width={{ xs: "100%", md: "60%" }}
            spacing={1}
            maxHeight={{ xs: "100%", md: "calc(100vh - 178px)" }}
            pr={{ xs: 0, md: 5 }}
        >
            <Cards />
        </Grid>

        <Grid
            container
            width={{ xs: "100%", md: "60%" }}
            spacing={1}
            maxHeight={{ xs: "100%", md: "calc(100vh - 178px)" }}
            pr={{ xs: 0, md: 5 }}
        >
            <IntegrationSites />
        </Grid>
    </Stack>
);

export default Stats;
