interface Props {
    type: "price" | "area";

    valueMin?: number;
    valueMax?: number;
    setMin: (v?: number) => void;
    setMax: (v?: number) => void;

    generateNumbers: () => number[];
}

export type { Props };
