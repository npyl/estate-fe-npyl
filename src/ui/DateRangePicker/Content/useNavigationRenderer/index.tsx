import { useCallback } from "react";
import NavigatorRenderer from "./NavigatorRenderer";
import { TMode } from "./NavigatorRenderer/types";

const useNagivationRenderer = () =>
    useCallback(
        (
            d: Date,
            changeCb: (value: Date | number | string, mode?: TMode) => void
        ) => (
            <NavigatorRenderer currFocusedDate={d} changeShownDate={changeCb} />
        ),
        []
    );

export default useNagivationRenderer;
