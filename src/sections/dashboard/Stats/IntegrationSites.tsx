import { useGetDashboardQuery } from "src/services/dashboard";
import CardWithIcon from "./CardWithIcon";
import { PropertyIntegrations } from "@/types/dashboard";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "@/components/Link";

const getCard = (i: PropertyIntegrations) => (
    <Grid xs={12} sm={6} key={i.site}>
        <Link href={`/property?integrationSite=${i.site}`}>
            <CardWithIcon title={i.properties.toString()} subtitle={i.site} />
        </Link>
    </Grid>
);

const IntegrationSites = () => {
    const { data } = useGetDashboardQuery();
    const sites = data?.integrations || [];

    return <>{sites.map(getCard)}</>;
};

export default IntegrationSites;
