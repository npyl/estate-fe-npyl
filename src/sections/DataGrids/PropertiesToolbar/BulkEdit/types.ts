import { IntegrationSite } from "@/types/integrations";

type StateType = {
    managerId: string;
    ownerId: string;
    zipCode: string;
    area: string;
    labels: number[];
    bedrooms: string;
    state: string;
    extras: string[];
    exclusive: boolean;
    publicSites: number[];
    integrations: IntegrationSite[];
};

export type { StateType };
