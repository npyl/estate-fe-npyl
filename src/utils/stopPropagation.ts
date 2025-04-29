import { MouseEvent } from "react";

const stopPropagation = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();

export default stopPropagation;
