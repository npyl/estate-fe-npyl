import { BlogFilters } from "@/types/company";

type TTags = Record<keyof BlogFilters, { label: string }>;

interface SingleChipProps {
    changedProps: any;
}

export type { TTags, SingleChipProps };
