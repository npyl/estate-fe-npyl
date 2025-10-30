const ADD_BALCONY_BUTTON_TESTID = "ADD_BALCONY_BUTTON_TESTID";
const AREA_TESTID = "AREA_TESTID";
const BALCONY_SIDE_SELECT_TESTID = "balcony-side-testid";

const getAreaTestId = (index: number) => `${AREA_TESTID}_${index}`;
const getBalconySideTestId = (index: number) =>
    `${BALCONY_SIDE_SELECT_TESTID}_${index}`;

export { ADD_BALCONY_BUTTON_TESTID, getAreaTestId, getBalconySideTestId };
