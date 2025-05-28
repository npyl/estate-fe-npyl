import { TMailbox } from "@/types/email";
import { Dispatch, SetStateAction } from "react";

interface Setters {
    setSearch: Dispatch<SetStateAction<string>>;

    setManager: Dispatch<SetStateAction<string>>;

    setBox: Dispatch<SetStateAction<TMailbox>>;
    setFrom: Dispatch<SetStateAction<string>>;
    setTo: Dispatch<SetStateAction<string[]>>;
    setToFreeSoloed: Dispatch<SetStateAction<string[]>>;
    setPropertyIds: Dispatch<SetStateAction<number[]>>;
}

export type { Setters };
