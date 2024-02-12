import { IOpenAIDetailsPOST } from "src/types/openai";

const getEnumKey = (key?: string) => (key !== "" ? key : undefined);

const fixDropdowns = (details?: IOpenAIDetailsPOST) => ({
    category: getEnumKey(details?.category),
    state: getEnumKey(details?.state),
    furnished: getEnumKey(details?.furnished),
    floor: getEnumKey(details?.floor),
    frameType: getEnumKey(details?.frameType),
    floorType: getEnumKey(details?.floorType),
    energyClass: getEnumKey(details?.energyClass),
});

export default fixDropdowns;
