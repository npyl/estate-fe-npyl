import { IOpenAIDetailsPOST } from "src/types/openai";

const getEnumKey = (key?: string) => (key !== "" ? key : undefined);

const fixDropdowns = (details?: IOpenAIDetailsPOST) => ({
    state: getEnumKey(details?.state),
    floor: getEnumKey(details?.floor),

    // energyClass: getEnumKey(details?.energyClass),
    // category: getEnumKey(details?.category),
    // furnished: getEnumKey(details?.furnished),
    // frameType: getEnumKey(details?.frameType),
    // floorType: getEnumKey(details?.floorType),
});

export default fixDropdowns;
