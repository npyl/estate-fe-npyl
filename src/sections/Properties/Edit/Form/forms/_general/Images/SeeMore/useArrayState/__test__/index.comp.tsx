import { useCallback } from "react";
import useArrayState from "..";

const VALUE_ID = "value-testid";
const SET_BUTTON_ID = "set-button-testid";
const RESET_BUTTON_ID = "reset-button-testid";

const INITIAL = [1, 2, 3, 4];
const AFTER = [5, 6, 7];

const Tester = () => {
    const [state, setState, clear] = useArrayState(INITIAL);
    const onSet = useCallback(() => setState(AFTER), []);
    return (
        <div>
            <div data-testid={VALUE_ID}>{JSON.stringify(state)}</div>
            <button data-testid={SET_BUTTON_ID} onClick={onSet} />
            <button data-testid={RESET_BUTTON_ID} onClick={clear} />
        </div>
    );
};

export {
    VALUE_ID,
    SET_BUTTON_ID,
    RESET_BUTTON_ID,
    // ...
    INITIAL,
    AFTER,
};
export default Tester;
