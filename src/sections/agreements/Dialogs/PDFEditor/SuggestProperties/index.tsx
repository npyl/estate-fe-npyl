import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

type PortalInfo = {
    container: Element;
    title: string;
};

const SuggestProperties = () => {
    const [portals, setPortals] = useState<PortalInfo[]>([]);

    useLayoutEffect(() => {
        const newPortals: PortalInfo[] = [];
        const inputs = document.querySelectorAll(".selectable");

        inputs.forEach((el) => {
            const title = el.getAttribute("title");
            if (
                title?.startsWith("suggestedProperties") &&
                title?.endsWith("area")
            ) {
                newPortals.push({ container: el, title });
            }
        });

        setPortals(newPortals);
    }, []);

    return (
        <>
            {portals.map(({ title, container }) =>
                createPortal(
                    <Button key={title} schemaKey={title} />,
                    container
                )
            )}
        </>
    );
};

export default SuggestProperties;
