import { FC } from "react";
import useDialog from "..";

const VALUE_ID = "value-testid";
const OPEN_BUTTON_ID = "open-button-testid";
const CLOSE_BUTTON_ID = "close-button-testid";

const VALUE_TRUE = "YES";
const VALUE_FALSE = "NO";

interface Props {
    initial?: boolean;
}

const Tester: FC<Props> = ({ initial }) => {
    const [isOpen, open, close] = useDialog(initial);
    const value = isOpen ? VALUE_TRUE : VALUE_FALSE;

    return (
        <div>
            <div data-testid={VALUE_ID}>{value}</div>
            <button data-testid={OPEN_BUTTON_ID} onClick={open} />
            <button data-testid={CLOSE_BUTTON_ID} onClick={close} />
        </div>
    );
};

export {
    VALUE_ID,
    OPEN_BUTTON_ID,
    CLOSE_BUTTON_ID,
    // ...
    VALUE_TRUE,
    VALUE_FALSE,
};
export default Tester;
