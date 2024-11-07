import { ICreateOrUpdateTaskReq } from "@/types/tasks";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import useDialog from "@/hooks/useDialog";
import { tasks } from "./tasks";

const baseUrl = `${process.env.NEXT_PUBLIC_PROXY_API}/tasks`;

const useCreateOrUpdateTaskMutation = () => {
    const [isLoading, startLoading, stopLoading] = useDialog();

    const dispatch = useDispatch();

    const cb = useCallback(async (b: ICreateOrUpdateTaskReq) => {
        startLoading();

        const res = await fetch(baseUrl, {
            headers: {
                Authorization: `Bearer  ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(b),
            method: "POST",
        });

        stopLoading();

        if (!res.ok) return null;

        dispatch(tasks.util.invalidateTags(["Board"]));
    }, []);

    return [cb, { isLoading }] as const;
};

export { useCreateOrUpdateTaskMutation };
