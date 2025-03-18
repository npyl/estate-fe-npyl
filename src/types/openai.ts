export interface IOpenAIDetailsPOST extends Partial<IOpenAIDetails> {}

export interface IOpenAIDetails {
    category: string;
    state: string;
    price: number;
    location: string;
    plotArea: number;
    yearOfConstruction: number;
    yearOfRenovation: number;
    floor: string;
    layers: number;
    kitchens: number;
    bathrooms: number;
    livingrooms: number;
    energyClass: string;
    balconies: number;
    attic: boolean;
    storeroom: boolean;
    safetyDoor: boolean;
    fireplace: boolean;
    suitableForStudent: boolean;
    pool: boolean;
    distanceFromPublicTransportation: number;
    distanceFromSea: number;
    distanceFromSupermarket: number;
    language: string;
    improveOption?: string;
    oldDescription?: string;
    styling?: boolean;

    frameType: string;
    floorType: string;
    furnished: string;
}
