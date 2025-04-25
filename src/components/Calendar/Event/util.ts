import { EVENT_CLASSNAME } from ".";

const lock = (el: HTMLElement) => (el.style.pointerEvents = "none");
const unlock = (el: HTMLElement) => (el.style.pointerEvents = "initial");

const lockExcept = (eventId: string) => (el: HTMLElement) => {
    if (el.id === eventId) return;
    lock(el);
};

const lockAllEventsExcept = (eventId: string) => {
    const c = document.getElementsByClassName(EVENT_CLASSNAME);
    const all = Array.from(c) as HTMLElement[];
    all.forEach(lockExcept(eventId));
};

const lockAllEvents = () => {
    const c = document.getElementsByClassName(EVENT_CLASSNAME);
    const all = Array.from(c) as HTMLElement[];
    all.forEach(lock);
};

const unlockAllEvents = () => {
    const c = document.getElementsByClassName(EVENT_CLASSNAME);
    const all = Array.from(c) as HTMLElement[];
    all.forEach(unlock);
};

export { lockAllEventsExcept, lockAllEvents, unlockAllEvents };
