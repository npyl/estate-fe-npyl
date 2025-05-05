import { FC } from "react";
import VIEWS, { FINAL } from "./Views";

interface ViewProps {
    idx: number;
}
const View: FC<ViewProps> = ({ idx }) => {
    try {
        if (idx === VIEWS.length) return <FINAL />;

        const CurrentView = VIEWS[idx];
        if (!CurrentView) return null;

        return <CurrentView />;
    } catch (ex) {
        return null;
    }
};

export default View;
