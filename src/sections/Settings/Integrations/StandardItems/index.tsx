import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import IntegrationItem from "./Item";
import { useGetIntegrationsQuery } from "@/services/company";
import INTEGRATIONS_ICONS from "@/assets/icons/integrations";
const EditDialog = dynamic(() => import("./EditDialog"));

const StandardItems = () => {
    const { data } = useGetIntegrationsQuery();

    const [selectedIntegration, setSelectedIntegration] = useState<any>();

    const handleCloseDialog = useCallback(
        () => setSelectedIntegration(undefined),
        []
    );

    return (
        <>
            {data?.map(({ id, name }, i) => (
                <IntegrationItem
                    key={id}
                    type={id}
                    name={name}
                    Icon={INTEGRATIONS_ICONS[id]}
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
