interface DatesDetail {
    startDate: string;
    endDate: string;
}

const UpdateEvent = "onUpdateCreateEvent";

const notifyCells = (startDate: string, endDate: string = "") => {
    const CE = new CustomEvent<DatesDetail>(UpdateEvent, {
        detail: {
            startDate,
            endDate,
        },
    });
    document.dispatchEvent(CE);
};

export { UpdateEvent, notifyCells };
export type { DatesDetail };
