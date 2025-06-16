import React from "react";
import IntegrationItem from "./IntegrationItem";
import usePropertyListings from "@/hooks/listings";

interface IntegrationsProps {
    onClick: VoidFunction;
}

const Integrations: React.FC<IntegrationsProps> = ({ onClick }) => {
    const { restListings } = usePropertyListings();

    return restListings?.map(({ integrationSite, published }) => (
        <IntegrationItem
            key={integrationSite}
            label={integrationSite}
            value={published}
            onClick={onClick}
        />
    ));
};

export default Integrations;
