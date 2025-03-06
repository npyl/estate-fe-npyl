/**
 * debounced: if true will make the hook-form setter debouce a bit before every set
 * onChange: if passed will expose value (HMTL) and plain (just plain content, no formatting) to the parent
 */
type TCommon = {
    onPlainTextChange?: (plain: string) => void;
};

export type { TCommon };
