import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { RHF_ERRORS_TESTID } from "./constants";

const ErrorWatcher = () => {
    const {
        formState: { errors },
    } = useFormContext();

    const haveError = useMemo(() => Object.keys(errors).length > 0, [errors]);

    useEffect(() => {
        if (!haveError) return;
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [haveError]);

    if (process.env.NODE_ENV !== "development") return null;

    // INFO: Only for testing
    return <div data-testid={RHF_ERRORS_TESTID}>{JSON.stringify(errors)}</div>;
};

export default ErrorWatcher;
