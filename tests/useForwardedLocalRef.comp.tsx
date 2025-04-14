import React, { HTMLAttributes, useCallback, useState } from "react";
import { forwardRef } from "react";
import useForwardedLocalRef from "../src/hooks/useForwadedLocalRef";

// ------------------------------------------------------------------------------------

const TEST_BUTTON_ID = "click-me-to-test";
const VALUE_ID = "check-value-here";

const RES_WORKS = "WORKS";
const RES_DOESNT_WORK = "DOESNT";

// ------------------------------------------------------------------------------------

interface CustomDivProps extends HTMLAttributes<HTMLDivElement> {
    onWorks: VoidFunction;
}

const CustomDiv = forwardRef<HTMLDivElement, CustomDivProps>(
    ({ onWorks, ...props }, ref) => {
        const [localRef, { onRef }] = useForwardedLocalRef(ref);

        const handleClick = useCallback(() => {
            if (!localRef.current) return;
            onWorks();
        }, []);

        return (
            <div ref={onRef} {...props}>
                <button data-testid={TEST_BUTTON_ID} onClick={handleClick} />
            </div>
        );
    }
);

// ------------------------------------------------------------------------------------

const Tester = () => {
    const [state, setState] = useState(RES_DOESNT_WORK);
    const handleWorks = useCallback(() => setState(RES_WORKS), []);
    return (
        <div>
            <CustomDiv onWorks={handleWorks} />
            <p data-testid={VALUE_ID}>{state}</p>
        </div>
    );
};

// ------------------------------------------------------------------------------------

export { TEST_BUTTON_ID, VALUE_ID, RES_WORKS, RES_DOESNT_WORK };
export default Tester;
