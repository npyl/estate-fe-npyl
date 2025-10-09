import IntegrationItem from "./Item";
import { useGetIntegrationsQuery } from "@/services/company";
import INTEGRATIONS_ICONS from "@/assets/icons/integrations";

const StandardItems = () => {
    const { data } = useGetIntegrationsQuery();

    return data?.map(({ id, name }, i) => (
        <IntegrationItem
            key={id}
            type={id}
            name={name}
            Icon={INTEGRATIONS_ICONS[id]}
            expandedInitialy={i === 0}
        />
    ));
};

export default StandardItems;
