const ADD_PARKING_BUTTON_TESTID = "ADD_PARKING_TESTID";
const PARKING_TYPE_SELECT_TESTID = "PARKING_TYPE_SELECT_TESTID";
const SPOTS_FIELD_TESTID = "SPOTS_FIELD_TESTID";

const getParkingTypeSelectTestId = (index: number) =>
    `${PARKING_TYPE_SELECT_TESTID}_${index}`;
const getSpotsTestId = (index: number) => `${SPOTS_FIELD_TESTID}_${index}`;

export {
    ADD_PARKING_BUTTON_TESTID,
    getParkingTypeSelectTestId,
    getSpotsTestId,
};
