const initialState: any[] = [];

const actionTypes = {
    ADD: "ADD",
    RESET: "RESET",
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case actionTypes.ADD:
            return [...state, action.payload];
        case actionTypes.RESET:
            return initialState;
        default:
            return state;
    }
};

export { actionTypes, reducer, initialState };
