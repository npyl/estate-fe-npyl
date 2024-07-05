// Flattening in this context is the process of converting a nested object into a single-level object.
// This implementation recursively traverses the object, creating new keys that represent the path to each value using dot notation.
// The result is a flat structure where complex nested data is represented by keys like "parent.child.grandchild",

interface NestedObject {
    [key: string]: any;
}

export function flattenObject(obj: NestedObject, parentKey = ""): NestedObject {
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
