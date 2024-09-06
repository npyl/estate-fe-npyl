export interface NestedObject {
    [key: string]: any;
}

function flattenObject(obj: NestedObject, parentKey = ""): NestedObject {
    const flattened: NestedObject = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const nestedKey = parentKey ? `${parentKey}.${key}` : key;

            if (typeof value === "object" && value !== null) {
                const nestedFlattened = flattenObject(value, nestedKey);
                Object.assign(flattened, nestedFlattened);
            } else {
                flattened[nestedKey] = `${value}`;
            }
        }
    }

    return flattened;
}

export default flattenObject;
