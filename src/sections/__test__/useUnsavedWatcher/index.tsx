import { useRouter } from "next/router";
import useUnsavedChangesWatcher from "@/components/hook-form/useFormPersist/useUnsavedWatcher";
import { CSSProperties, FC, useCallback } from "react";
import { NAVIGATE_TESTID, SAME_PATH_REDIRECT_TESTID } from "./constants";

const STYLE: CSSProperties = {
    width: "100px",
    height: "100px",
};

interface Props {
    onExit?: VoidFunction;
}

const Tester: FC<Props> = ({ onExit: _onExit }) => {
    const router = useRouter();

    const onExit = useCallback(() => {
        window.incrementTestCallCount();
        _onExit?.();
    }, []);

    useUnsavedChangesWatcher(onExit);

    return (
        <div>
            <button
                data-testid={SAME_PATH_REDIRECT_TESTID}
                onClick={() => router.push(router.asPath)}
                style={STYLE}
            />

            <button
                data-testid={NAVIGATE_TESTID}
                style={STYLE}
                onClick={() => router.push("/")}
            />
        </div>
    );
};

export default Tester;
