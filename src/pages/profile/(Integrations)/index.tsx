import React, { useCallback, useState } from "react";
import EditDialog from "./EditDialog";
import { IIntegration } from "src/types/integrations";
import IntegrationItem from "./Item";
import { IntegrationSite } from "@/types/listings";
import Stack from "@mui/material/Stack";

const INTEGRATION_SITES: IntegrationSite[] = [
    "SPITOGATOS",
    "PLOT_GR",
    "JAMES_EDITION",
    "XE",
    "RIGHT_MOVE",
    "FERIMMO",
];

const Integrations: React.FC = () => {
    const [selectedIntegration, setSelectedIntegration] =
        useState<IIntegration>();

    const handleCloseDialog = useCallback(
        () => setSelectedIntegration(undefined),
        []
    );

    return (
        <>
            <Stack spacing={1}>
                {INTEGRATION_SITES.map((t, i) => (
                    <IntegrationItem
                        key={t}
                        type={t}
                        expandedInitialy={i === 0}
                        onEdit={setSelectedIntegration}
                    />
                ))}
            </Stack>

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

export default Integrations;
