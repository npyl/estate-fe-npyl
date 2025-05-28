import { TMailbox } from "@/types/email";
import { Dispatch, SetStateAction } from "react";

interface Setters {
    setSearch: Dispatch<SetStateAction<string>>;
    setManager: Dispatch<SetStateAction<string>>;
    setBox: Dispatch<SetStateAction<TMailbox>>;
    setPropertyIds: Dispatch<SetStateAction<number[]>>;

    setPeople: Dispatch<SetStateAction<string[]>>;
    setPeopleFreeSoloed: Dispatch<SetStateAction<string[]>>;
}

export type { Setters };
