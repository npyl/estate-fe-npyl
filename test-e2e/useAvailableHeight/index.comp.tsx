import { useRef } from "react";
import useAvailableHeight from "../../src/hooks/useAvailableHeight";
import useDialog from "../../src/hooks/useDialog";

const BUTTON_ID = "button-testid";
const TARGET_ID = "target-testid";
const ROOT_ID = "root-testid";

interface WidthHeight {
    width: number;
    height: number;
}

const SMALL_BOX_STYLE: WidthHeight = { width: 500, height: 500 };
const BIG_BOX_STYLE: WidthHeight = { width: 1000, height: 1000 };

const Tester = () => {
    const rootRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    useAvailableHeight(boxRef, rootRef);

    const [isResize, doResize] = useDialog();
    const ROOT_STYLE = isResize ? BIG_BOX_STYLE : SMALL_BOX_STYLE;

    return (
        <div>
            <div data-testid={ROOT_ID} ref={rootRef} style={ROOT_STYLE}>
                <div data-testid={TARGET_ID} ref={boxRef} />
            </div>

            <button data-testid={BUTTON_ID} onClick={doResize} />
        </div>
    );
};

export {
    BUTTON_ID,
    TARGET_ID,
    ROOT_ID,
    // ...
    SMALL_BOX_STYLE,
    BIG_BOX_STYLE,
};
export type { WidthHeight };
export default Tester;
