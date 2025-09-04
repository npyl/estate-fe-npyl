declare global {
    interface JSON {
        parseSafe<T = any>(
            text: string | null | undefined,
            reviver?: (this: any, key: string, value: any) => any
        ): T | null;
    }
}

export {};
