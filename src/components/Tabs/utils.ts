import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTab } from "src/slices/tabs";

interface TabProps {
    title: string;
    path: string;
}

export const usePublishTab = (tab: TabProps, dep?: string) => {
    // dep: can be property code or customer name or anything else; appended to title

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            addTab({
                title: dep ? `${tab.title} ${dep}` : tab.title,
                path: tab.path,
            })
        );
    }, [dep]);
};

export const deleteTab = () => {};
