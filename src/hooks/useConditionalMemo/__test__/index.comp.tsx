import useConditionalMemo from "@/hooks/useConditionalMemo";
import { CSSProperties, FC, useCallback, useState } from "react";

const BUTTON_ID = "button-testid";
const VALUE_ID = "value-testid";

const BUTTON_STYLE: CSSProperties = {
    width: "100px",
    height: "100px",
};

interface TesterProps {
    isConditionMet: boolean;
}

const Tester: FC<TesterProps> = ({ isConditionMet }) => {
    const [value, setValue] = useState(-1);
    const memoisedValue = useConditionalMemo(
        () => value,
        () => isConditionMet,
        [value]
    );
    const onClick = useCallback(() => setValue(10), []);
    return (
        <div>
            <button
                data-testid={BUTTON_ID}
                onClick={onClick}
                style={BUTTON_STYLE}
            />
            <div data-testid={VALUE_ID}>{memoisedValue}</div>
        </div>
    );
};

export { VALUE_ID, BUTTON_ID };
export default Tester;
