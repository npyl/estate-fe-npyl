import { Url } from "next/dist/shared/lib/router/router";
import { NextRouter, useRouter } from "next/router";
import { useCallback } from "react";
import { toast } from "react-toastify";

//
//  Custom next/router that prevents push() when a cancelCondition is met
//

const useConditionalRouter = (
    cancelCondition: boolean,
    message?: string
): NextRouter => {
    const router = useRouter();

    const push = useCallback(
        async (url: Url) => {
            // prevent routing (optional: show info message)
            if (cancelCondition) {
                if (message) toast.warn(message);
                return false;
            }

            // otherwise normal
            return router.push(url);
        },
        [cancelCondition]
    );

    return { ...router, push };
};

export default useConditionalRouter;
