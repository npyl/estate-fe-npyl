interface IValuationRes {
    normal: {
        min: number;
        mid: number;
        max: number;
    };
    bySquareMeter: {
        min: number;
        mid: number;
        max: number;
    };

    smallSample: boolean;
}

export type { IValuationRes };
