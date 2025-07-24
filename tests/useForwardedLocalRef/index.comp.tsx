import { HTMLAttributes, useCallback, useRef, useState } from "react";
import { forwardRef } from "react";
import useForwardedLocalRef from "../../src/hooks/useForwadedLocalRef";

// ------------------------------------------------------------------------------------

const TEST_BUTTON0_ID = "test-btn0-id";
const TEST_BUTTON1_ID = "test-btn1-id";
const VALUE_ID = "check-value-here";

const RES_WORKS = "WORKS";
const FINAL = "expected-string";
const RES_DOESNT_WORK = "DOESNT";

// ------------------------------------------------------------------------------------

interface CustomDiv0Props extends HTMLAttributes<HTMLDivElement> {
    onWorks: VoidFunction;
}

const CustomDiv0 = forwardRef<HTMLDivElement, CustomDiv0Props>(
    ({ onWorks, ...props }, ref) => {
        const [localRef, { onRef }] = useForwardedLocalRef(ref);

        const handleClick = useCallback(() => {
            if (!localRef.current) return;
            onWorks();
        }, []);

        return (
            <div ref={onRef} {...props}>
                <button data-testid={TEST_BUTTON0_ID} onClick={handleClick} />
            </div>
        );
    }
);

interface CustomDiv1Ref extends HTMLAttributes<HTMLDivElement> {
    onExtraMethod: () => string;
}

interface CustomDiv1Props extends HTMLAttributes<HTMLDivElement> {
    onClick: VoidFunction;
}

const CustomDiv1 = forwardRef<CustomDiv1Ref, CustomDiv1Props>(
    ({ onClick, ...props }, ref) => {
        const onExtraMethod = useCallback(() => {
            return FINAL;
        }, []);
        const [_, { onRef }] = useForwardedLocalRef(ref as any, {
            onExtraMethod,
        });

        return (
            <div ref={onRef} {...props}>
                <button data-testid={TEST_BUTTON1_ID} onClick={onClick} />
            </div>
        );
    }
);

// ------------------------------------------------------------------------------------

const Tester = () => {
    const [state, setState] = useState(RES_DOESNT_WORK);
    const handleWorks = useCallback(() => setState(RES_WORKS), []);

    const customDiv1Ref = useRef<CustomDiv1Ref>(null);
    const onClickDiv1 = useCallback(() => {
        setState(customDiv1Ref.current?.onExtraMethod() || "");
    }, []);

    return (
        <div>
            <CustomDiv0 onWorks={handleWorks} />
            <CustomDiv1 ref={customDiv1Ref} onClick={onClickDiv1} />
            <p data-testid={VALUE_ID}>{state}</p>
        </div>
    );
};

// ------------------------------------------------------------------------------------

export {
    TEST_BUTTON0_ID,
    TEST_BUTTON1_ID,
    VALUE_ID,
    FINAL,
    RES_WORKS,
    RES_DOESNT_WORK,
};
export default Tester;
