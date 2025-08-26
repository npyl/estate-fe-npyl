import { useAuth } from "@/sections/use-auth";
import { TMailbox } from "@/types/email";
import { useLayoutEffect, useMemo } from "react";

type UseFromTo = (
    manager: string,
    box: TMailbox,
    people: string[],
    peopleFreeSoloed: string[]
) => { from: string[]; to: string[] };

const useFromTo: UseFromTo = (manager, box, people, peopleFreeSoloed) => {
    const { user } = useAuth();

    useLayoutEffect(() => {
        if (!user?.workspaceEmail) throw "WORKSPACE_EMAIL_NOT_CONFIGURED";
    }, [user?.workspaceEmail]);

    const me = manager || user?.workspaceEmail!;

    return useMemo(() => {
        const all = [...people, ...peopleFreeSoloed];

        switch (box) {
            case "INBOX":
            case "SPAM":
                return {
                    from: all,
                    to: [me],
                };
            case "SENT":
                return {
                    from: [me],
                    to: all,
                };
            default:
                return {
                    from: [],
                    to: [],
                };
        }
    }, [me, box, people, peopleFreeSoloed]);
};

export default useFromTo;
