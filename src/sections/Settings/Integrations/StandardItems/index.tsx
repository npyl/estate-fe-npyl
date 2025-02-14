import dynamic from "next/dynamic";
import { ReactNode, useCallback, useState } from "react";
import { IIntegration } from "src/types/integrations";
import IntegrationItem from "./Item";
import { IntegrationSite } from "@/types/listings";
const EditDialog = dynamic(() => import("./EditDialog"));

// const DISABLED: IntegrationSite[] = ["XE", "FERIMMO"];

type TIntegrationOption = { type: IntegrationSite; icon: ReactNode };

const INTEGRATION_SITES: TIntegrationOption[] = [
    { type: "SPITOGATOS", icon: null },
    { type: "PLOT_GR", icon: null },
    { type: "JAMES_EDITION", icon: null },
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
            {INTEGRATION_SITES.map(({ type, icon }, i) => (
                <IntegrationItem
                    key={type}
                    type={type}
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
