interface IValuationRes {
    normal: {
        min: number;
        mid: number;
        max: number;
    };
    perSqm: {
        min: number;
        mid: number;
        max: number;
    };

    smallSample: boolean;
}

export type { IValuationRes };
