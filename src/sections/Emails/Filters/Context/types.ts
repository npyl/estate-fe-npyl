import { Dispatch, SetStateAction } from "react";

interface Setters {
    setSearch: Dispatch<SetStateAction<string>>;
    setFrom: Dispatch<SetStateAction<string>>;
    setTo: Dispatch<SetStateAction<string[]>>;
    setToFreeSoloed: Dispatch<SetStateAction<string[]>>;
    setPropertyIds: Dispatch<SetStateAction<number[]>>;
}

export type { Setters };
