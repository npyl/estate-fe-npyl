import { MouseEvent } from "react";

const stopPropagation = (e: MouseEvent<HTMLElement>) => e.stopPropagation();

export default stopPropagation;
