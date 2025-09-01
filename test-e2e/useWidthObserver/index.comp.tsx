import { useRef, useState } from "react";
import useDialog from "../../src/hooks/useDialog";
import useWidthObserver from "../../src/hooks/useWidthObserver";

const BUTTON_ID = "button-testid";
const TARGET_ID = "target-testid";
const VALUE_ID = "value-testid";

interface WidthHeight {
    width: number;
    height: number;
}

const SMALL_BOX_STYLE: WidthHeight = { width: 500, height: 500 };
const BIG_BOX_STYLE: WidthHeight = { width: 1000, height: 1000 };

const Tester = () => {
    const targetRef = useRef<HTMLDivElement>(null);

    const [width, onWidthChange] = useState(0);
    const { onRef } = useWidthObserver(targetRef, onWidthChange);

    const [isResize, doResize] = useDialog();
    const TARGET_STYLE = isResize ? BIG_BOX_STYLE : SMALL_BOX_STYLE;

    return (
        <div>
            <div data-testid={TARGET_ID} ref={onRef} style={TARGET_STYLE} />
            <div data-testid={VALUE_ID}>{width}</div>
            <button data-testid={BUTTON_ID} onClick={doResize} />
        </div>
    );
};

export {
    BUTTON_ID,
    TARGET_ID,
    VALUE_ID,
    // ...
    SMALL_BOX_STYLE,
    BIG_BOX_STYLE,
};
export type { WidthHeight };
export default Tester;
