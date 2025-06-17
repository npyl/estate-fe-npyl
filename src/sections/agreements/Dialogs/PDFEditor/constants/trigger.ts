import { IAgreementType } from "@/types/agreements";
import { TForm } from "../../Preparation/types";
import { FieldPath } from "react-hook-form";

const getTRIGGER_OPTIONS = (variant: IAgreementType): FieldPath<TForm>[] => [
    "owner",
    "property",
    "commissionAndDuration",
    "gdpr",
    // If we are on a purchase form add one more trigger
    ...(variant === "PURCHASE" ? (["suggestedProperties"] as const) : []),
];

export { getTRIGGER_OPTIONS };
