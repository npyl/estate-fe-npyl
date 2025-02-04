declare global {
    interface JSON {
        parseSafe<T = any>(
            text: string,
            reviver?: (this: any, key: string, value: any) => any
        ): T | null;
    }
}

export {};
