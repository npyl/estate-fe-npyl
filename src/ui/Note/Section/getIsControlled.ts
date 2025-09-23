import isFalsy from "@/utils/isFalsy";

const getIsControlled = (resourceId?: number) => {
    if (isFalsy(resourceId)) return true;
    return resourceId === -1;
};

export default getIsControlled;
