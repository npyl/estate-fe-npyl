import { useLayoutEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { createRoot, Root } from "react-dom/client";
import ErrorTooltip from "../_shared/ErrorTooltip";
import { useTranslation } from "react-i18next";
import { TranslationType } from "@/types/translation";

//
//  INFO:
//  pdfme's textfields are type 'text' "schemas"
//  Every type 'text' schema is rendered as a <div> with className '.selectable' and with an attribute called 'title'
//

type InputName = string;

const removeTooltip = (root: Root) => setTimeout(() => root.unmount(), 0);

const messageFromObjectSchema = (errorObject: any, t: TranslationType) =>
    Object.keys(errorObject).includes("message")
        ? errorObject?.message || ""
        : t("FILL_IN_ALL_FIELDS_ERROR"); // INFO: this is for cases like: z.array(z.object({ z.string(), ... })) (e.g. suggestedProperties)

const ErrorTooltips = () => {
    const { formState } = useFormContext();

    const rootRefs = useRef<Record<InputName, Root>>({});

    const { t } = useTranslation();

    useLayoutEffect(() => {
        const { errors } = formState;

        const inputs = document.querySelectorAll(".selectable");

        inputs.forEach((el) => {
            const title = el.getAttribute("title") || "";
            if (!title) return;

            // Get a react root for el
            let currentRoot = rootRefs.current[title];

            const [parent, child] = title.split(".");

            const isObjectSchema = child in (errors?.[parent] || {}); // z.object()
            const isArraySchema = "message" in (errors?.[parent] || {}); // z.array()

            if (isObjectSchema || isArraySchema) {
                // if we don't already have it:
                if (!currentRoot) {
                    // create a container
                    const container = document.createElement("div");
                    container.className = "error-tooltip-container";

                    // keep a record of it
                    currentRoot = createRoot(container);
                    rootRefs.current[title] = currentRoot;

                    // append to DOM
                    el.appendChild(container);
                }

                const error = isArraySchema
                    ? errors?.[parent]?.message
                    : // Object Schema:
                      // @ts-ignore
                      messageFromObjectSchema(errors?.[parent]?.[child], t);

                // render or re-render (in case of update)
                currentRoot.render(<ErrorTooltip error={error} />);
            } else {
                // There are fields that start off without errors (a.k.a. pass yup validation)
                // Prevent from unmounting/cleaning a non-existent node
                if (!currentRoot) return;

                // Unmount tooltip
                removeTooltip(currentRoot);

                // Remove record from refs
                delete rootRefs.current[title];

                const container = el.querySelector(".error-tooltip-container");
                if (container) el.removeChild(container);
            }
        });
    }, [t, formState]);

    useLayoutEffect(() => {
        // Unmount all remaining tooltips
        return () => {
            Object.values(rootRefs.current).forEach(removeTooltip);
        };
    }, []);

    return null;
};

export default ErrorTooltips;
