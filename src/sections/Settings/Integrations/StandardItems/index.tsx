import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { IIntegration } from "src/types/integrations";
import IntegrationItem from "../Item";
import { IntegrationSite } from "@/types/listings";
const EditDialog = dynamic(() => import("./EditDialog"));

// const DISABLED: IntegrationSite[] = ["XE", "FERIMMO"];

const INTEGRATION_SITES: IntegrationSite[] = [
    "SPITOGATOS",
    "PLOT_GR",
    "JAMES_EDITION",
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
            {INTEGRATION_SITES.map((t, i) => (
                <IntegrationItem
                    key={t}
                    type={t}
                    expandedInitialy={i === 0}
                    onEdit={setSelectedIntegration}
                />
            ))}

            {selectedIntegration ? (
                <EditDialog
                    open={!!selectedIntegration}
                    onClose={handleCloseDialog}
                    initialValues={selectedIntegration}
                />
            ) : null}
        </>
    );
};

export default StandardItems;
