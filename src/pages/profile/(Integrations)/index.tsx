import React, { useState } from "react";
import EditDialog from "./EditDialog";
import { IIntegration } from "src/types/integrations";
import IntegrationItem from "./Item";

const Integrations: React.FC = () => {
    const [selectedIntegration, setSelectedIntegration] =
        useState<IIntegration>();

    const handleCloseDialog = () => {
        setSelectedIntegration(undefined);
    };

    return (
        <>
            <IntegrationItem
                type="SPITOGATOS"
                expandedInitialy
                onEdit={setSelectedIntegration}
            />

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
