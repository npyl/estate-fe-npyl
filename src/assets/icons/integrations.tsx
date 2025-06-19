import { IntegrationSite } from "@/types/integrations";
import { ComponentType } from "react";
import FerimmoIcon from "@/assets/integrations/ferimmo";
import XEIcon from "@/assets/integrations/xrysh_eukairia";
import RightMoveIcon from "@/assets/integrations/RightMoveIcon";
import SpitogatosSvg from "@/assets/integrations/SpitogatosSvg";
import PlotGRIcon from "@/assets/integrations/plotgr";
import JamesEditionIcon from "@/assets/integrations/james_edition";

type TIconMap = {
    [key in IntegrationSite]: ComponentType<any>;
};

const INTEGRATIONS_ICONS: TIconMap = {
    SPITOGATOS: SpitogatosSvg,
    PLOT_GR: PlotGRIcon,
    JAMES_EDITION: JamesEditionIcon,
    XE: XEIcon,
    RIGHT_MOVE: RightMoveIcon,
    FERIMMO: FerimmoIcon,
};

export default INTEGRATIONS_ICONS;
