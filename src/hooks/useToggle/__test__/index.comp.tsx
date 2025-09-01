import { FC, useCallback } from "react";
import useToggle from "..";

const VALUE_ID = "value-testid";
const TOGGLE_BUTTON_ID = "toggle-button-testid";
const SET_BUTTON_ID = "set-button-testid";

const VALUE_TRUE = "YES";
const VALUE_FALSE = "NO";

interface Props {
    initial?: boolean;
}

const Tester: FC<Props> = ({ initial }) => {
    const [state, onToggle, setState] = useToggle(initial);
    const value = state ? VALUE_TRUE : VALUE_FALSE;

    const onSet = useCallback(() => setState(true), []);

    return (
        <div>
            <div data-testid={VALUE_ID}>{value}</div>
            <button data-testid={TOGGLE_BUTTON_ID} onClick={onToggle} />
            <button data-testid={SET_BUTTON_ID} onClick={onSet} />
        </div>
    );
};

export {
    VALUE_ID,
    TOGGLE_BUTTON_ID,
    SET_BUTTON_ID,
    // ...
    VALUE_TRUE,
    VALUE_FALSE,
};
export default Tester;
