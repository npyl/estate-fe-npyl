const HEADER_HEIGHT = 64;
const DAY_CELL_HEIGHT = 60;

// START, END hours correspond to calendar rows
const START_HOUR = 7;
const END_HOUR = 22;
const TOTAL_HOURS = END_HOUR - START_HOUR + 1;

const Z_INDEX = {
    DIVIDER: 0,
    NUMBERING: 1,
    EVENT: 3,
    HEADER: 4,
};

export {
    Z_INDEX,
    // ...
    HEADER_HEIGHT,
    DAY_CELL_HEIGHT,
    // ...
    START_HOUR,
    END_HOUR,
    TOTAL_HOURS,
};
