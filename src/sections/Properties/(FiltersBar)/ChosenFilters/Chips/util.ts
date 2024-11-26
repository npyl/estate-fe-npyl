// getting the value and not the key of each enumValue
const getEnumLabel = (key: any, enumValues: any) => {
    const foundItem = enumValues.find((item: any) => item.key === key);
    return foundItem ? foundItem.value : "Unknown";
};

export default getEnumLabel;
