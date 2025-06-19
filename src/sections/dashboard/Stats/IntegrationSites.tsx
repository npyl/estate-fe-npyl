import { useGetDashboardQuery } from "src/services/dashboard";
import CardWithIcon from "./CardWithIcon";
import { PropertyIntegrations } from "@/types/dashboard";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "@/components/Link";
import { Home } from "@mui/icons-material";
import { IntegrationSite } from "@/types/integrations";
import JamesEdition from "@/assets/integrations/svgs/JamesEdition";
import { TAnySvg } from "./types";
import SpitogatosSvg from "@/assets/integrations/SpitogatosSvg";
import PlotGR from "@/assets/integrations/svgs/Plot";
import XE from "@/assets/integrations/svgs/XE";

type ISvgs = {
    [key in IntegrationSite]: TAnySvg;
};

const SVGS: ISvgs = {
    SPITOGATOS: SpitogatosSvg,
    JAMES_EDITION: JamesEdition,
    PLOT_GR: PlotGR,
    XE,
    FERIMMO: Home,
    RIGHT_MOVE: Home,
};

const getCard = (i: PropertyIntegrations) => (
    <Grid xs={12} sm={6} md={12} lg={3} key={i.site}>
        <Link href={`/property?integrationSite=${i.site}`}>
            <CardWithIcon
                title={i.properties.toString()}
                subtitle={i.site}
                Svg={SVGS[i.site]}
            />
        </Link>
    </Grid>
);

const IntegrationSites = () => {
    const { data } = useGetDashboardQuery();
    const sites = data?.integrations || [];

    return <>{sites.map(getCard)}</>;
};

export default IntegrationSites;
