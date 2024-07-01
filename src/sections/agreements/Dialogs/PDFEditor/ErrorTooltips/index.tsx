import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import ErrorTooltip from "./Tooltip";

const ErrorTooltips = () => {
    const { formState } = useFormContext();

    const TOOLTIPS = useMemo(
        () => {
            const { errors } = formState;

            const inputs = document.querySelectorAll(".selectable");

            const res = Array.from(inputs).map((el) => {
                const [parent, child] = el
                    .getAttribute("title") // format: ${parent}.${child}
                    ?.split(".") || ["", ""];

                const rect = el.getBoundingClientRect();

                // @ts-ignore
                const error = errors?.[parent]?.[child]?.message || "";

                if (child in (errors?.[parent] || {}))
                    return (
                        <ErrorTooltip
                            key={`${parent}.${child}`}
                            sx={{
                                position: "fixed",
                                left: `${rect.left + rect.width - 25}px`,
                                top: `${rect.top + 10}px`,
                                zIndex: 1500,
                            }}
                            error={error || ""}
                        />
                    );

                return null;
            });

            return res;
        },
        // INFO: use formState (instead of formState.errors) as dependency as recommended in rhf docs (https://react-hook-form.com/docs/useform/formstate)
        [formState]
    );

    return <>{TOOLTIPS}</>;
};

export default ErrorTooltips;
