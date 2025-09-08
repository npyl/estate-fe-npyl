import { useRouter } from "next/router";
import useUnsavedChangesWatcher from "@/components/hook-form/useFormPersist/useUnsavedWatcher";
import { FC, useCallback } from "react";
import { NAVIGATE_TESTID, SAME_PATH_REDIRECT_TESTID } from "./constants";

interface Props {
    onExit?: VoidFunction;
}

const Tester: FC<Props> = ({ onExit: _onExit }) => {
    const router = useRouter();

    const onExit = useCallback(() => {
        (window as any).incrementTestCallCount();
        _onExit?.();
    }, []);

    useUnsavedChangesWatcher(onExit);

    return (
        <div>
            <button
                data-testid={SAME_PATH_REDIRECT_TESTID}
                onClick={() => router.push(router.asPath)}
            />

            <button
                data-testid={NAVIGATE_TESTID}
                onClick={() => router.push("/different-page")}
            />

            <div data-testid="current-path">{router.asPath}</div>
        </div>
    );
};

export default Tester;
