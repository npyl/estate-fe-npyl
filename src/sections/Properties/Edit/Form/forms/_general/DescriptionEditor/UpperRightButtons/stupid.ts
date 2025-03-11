import { IOpenAIDetailsPOST } from "src/types/openai";

const getEnumKey = (key?: string) => (key !== "" ? key : undefined);

const fixDropdowns = (details?: IOpenAIDetailsPOST) => ({
    category: getEnumKey(details?.category),
    state: getEnumKey(details?.state),
    floor: getEnumKey(details?.floor),
    // furnished: getEnumKey(details?.furnished),
    // frameType: getEnumKey(details?.frameType),
    // floorType: getEnumKey(details?.floorType),
    energyClass: getEnumKey(details?.energyClass),
});

export default fixDropdowns;
