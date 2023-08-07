import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTab } from "src/slices/tabs";

interface TabProps {
    title: string;
    path: string;
}

export const usePublishTab = (tab: TabProps) => {
    const dispatch = useDispatch();

    // run when tab changes
    useEffect(() => {
        dispatch(addTab(tab));
    }, []);
};

export const deleteTab = () => {};
