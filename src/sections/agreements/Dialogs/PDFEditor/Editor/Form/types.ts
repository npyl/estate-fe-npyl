import { FieldPath } from "react-hook-form";
import { TForm } from "../../../Preparation/types";

interface KeyValuePair {
    key: FieldPath<TForm>;
    value: string;
}

export type { KeyValuePair };
