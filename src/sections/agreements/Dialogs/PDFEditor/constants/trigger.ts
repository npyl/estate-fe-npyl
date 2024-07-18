import { IAgreementType } from "@/types/agreements";

const getTRIGGER_OPTIONS = (variant: IAgreementType) => [
    "owner",
    "property",
    "commissionAndDuration",
    "gdpr",
    // If we are on a purchase form add one more trigger
    ...(variant === "purchase" ? ["suggestedProperties"] : []),
];

export { getTRIGGER_OPTIONS };
