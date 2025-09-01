const getIndexMapped = (a: any[]) =>
    a.map((item, i) => ({
        id: i,
        item,
    }));

export default getIndexMapped;
