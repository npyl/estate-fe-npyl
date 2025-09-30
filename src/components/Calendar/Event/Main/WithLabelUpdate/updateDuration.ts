import { RefObject } from "react";
import { getText } from "../../_shared/Duration";
import { CellPosition } from "../EventsTarget/types";
import sleep from "@/utils/sleep";
import getOverlapRatio from "../EventsTarget/WithDrag/useDraggable/getOverlapRatio";
import calculateNewDates from "../EventsTarget/WithDrag/useDraggable/calculateNewDates";

const NO_OP = ((s: string) => s) as any;

const updateDurationLabelAsync = async (
    el: HTMLDivElement | null,
    cellsRef: RefObject<CellPosition[]>
) => {
    await sleep(300);

    const duration = el?.getElementsByClassName("PPEvent-Duration")?.[0];
    if (!duration) return;

    const elementRect = el.getBoundingClientRect();

    // Find the cell with maximum overlap
    const target = cellsRef.current?.reduce(
        (best, cell) => {
            const overlap = getOverlapRatio(elementRect, cell);

            return overlap > (best?.overlap ?? 0)
                ? { cell: cell.element, overlap }
                : best;
        },
        null as { cell: HTMLElement; overlap: number } | null
    );

    if (!target) return;

    const { startDate, endDate } =
        calculateNewDates(target.cell, elementRect) || {};
    if (!startDate || !endDate) return;

    duration.textContent = getText(startDate, endDate, NO_OP);
};

export default updateDurationLabelAsync;
