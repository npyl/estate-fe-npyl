interface ParseItemResult {
    itemId: number;
    dndId?: number;
}
interface ParseRowResult {
    rowId: number;
    dndId?: number;
}

const parseItemId = (str?: string): ParseItemResult => {
    if (!str) return { itemId: -1, dndId: undefined };

    // Regular expression to match either 'item-{i}', '{j}-item-{i}', or '{i}-item-{j}'
    const dualMatch = str.match(/(?:([0-9]+)-)?item-([0-9]+)/);
    if (!dualMatch) return { itemId: -1, dndId: undefined };

    const dndId =
        dualMatch[1] !== undefined ? parseInt(dualMatch[1], 10) : undefined;
    const itemId = parseInt(dualMatch[2], 10);

    return { itemId, dndId };
};

const parseRowId = (str?: string): ParseRowResult => {
    if (!str) return { rowId: -1, dndId: undefined };

    // Regular expression to match either 'row-{i}' or '{j}-row-{i}'
    const dualMatch = str.match(/(?:([0-9]+)-)?row-([0-9]+)/);
    if (!dualMatch) return { rowId: -1, dndId: undefined };

    const dndId =
        dualMatch[1] !== undefined ? parseInt(dualMatch[1], 10) : undefined;
    const rowId = parseInt(dualMatch[2], 10);

    return { rowId, dndId };
};

export { parseItemId, parseRowId };
