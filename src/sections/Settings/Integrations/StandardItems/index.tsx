import dynamic from "next/dynamic";
import { ComponentType, useCallback, useState } from "react";
import { IIntegration } from "src/types/integrations";
import IntegrationItem from "./Item";
import { IntegrationSite } from "@/types/listings";
import SpitogatosSvg from "@/assets/integrations/SpitogatosSvg";
import PlotGRIcon from "@/assets/integrations/plotgr";
import JamesEditionIcon from "@/assets/integrations/james_edition";
const EditDialog = dynamic(() => import("./EditDialog"));

// import FerimmoIcon from "@/assets/integrations/ferimmo";
// import XEIcon from "@/assets/integrations/xrysh_eukairia";

// const DISABLED: IntegrationSite[] = ["XE", "FERIMMO"];

type TIntegrationOption = {
    type: IntegrationSite;
    name: string;
    icon: ComponentType<any>;
};

const INTEGRATION_SITES: TIntegrationOption[] = [
    { type: "SPITOGATOS", name: "Spitogatos.gr", icon: SpitogatosSvg },
    { type: "PLOT_GR", name: "plot.gr", icon: PlotGRIcon },
    { type: "JAMES_EDITION", name: "jamesedition.com", icon: JamesEditionIcon },
];

const StandardItems = () => {
    const [selectedIntegration, setSelectedIntegration] =
        useState<IIntegration>();

    const handleCloseDialog = useCallback(
        () => setSelectedIntegration(undefined),
        []
    );

    return (
        <>
            {INTEGRATION_SITES.map(({ type, name, icon }, i) => (
                <IntegrationItem
                    key={type}
                    type={type}
                    name={name}
                    Icon={icon}
                    expandedInitialy={i === 0}
                    onEdit={setSelectedIntegration}
                />
            ))}

            {selectedIntegration ? (
                <EditDialog
                    open
                    onClose={handleCloseDialog}
                    initialValues={selectedIntegration}
                />
            ) : null}
        </>
    );
};

export default StandardItems;
