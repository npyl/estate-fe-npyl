import { RootState } from "@/store";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface Props {
    type: "price" | "area";

    selectMin: (s: RootState) => number | undefined;
    selectMax: (s: RootState) => number | undefined;
    setMin: ActionCreatorWithPayload<any, any>;
    setMax: ActionCreatorWithPayload<any, any>;

    generateNumbers: (type: "price" | "area") => number[];
}

export type { Props };
