import { IPropertyFile } from "@/types/file";
import { useMemo } from "react";

// INFO: can't find another unique field inside File object so forcefully cast string to number
const getId = (name: string) => name as unknown as number;

// INFO: name is always unique; either coming from filesystem or uuidv4()
const getKey = (f: File) => f.name;

const getPropertyFile = (f: File): IPropertyFile => {
    const key = getKey(f);
    return {
        id: getId(key),
        key,
        filename: key,
        url: URL.createObjectURL(f),
    };
};

const useSrc = (f: File[]) => useMemo(() => f.map(getPropertyFile), [f]);

export default useSrc;
