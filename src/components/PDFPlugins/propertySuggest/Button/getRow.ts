const getRow = (key: string) => {
    try {
        const parts = key.split(".");

        if (parts.length >= 2) {
            return parseInt(parts[1], 10);
        }

        return -1;
    } catch (ex) {
        return -1;
    }
};

export default getRow;
