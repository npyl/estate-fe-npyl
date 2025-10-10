import { getEventId } from "@/components/Calendar/Event/constants";

const timeout = 5000;

/*
 *  Helper function to wait for an element to appear in the DOM
 */
const waitForEvent = (selector: string): Promise<HTMLElement> => {
    return new Promise((resolve, reject) => {
        const element = document.querySelector(selector) as HTMLElement;
        if (element) {
            resolve(element);
            return;
        }

        // Set up MutationObserver to watch for the element
        const observer = new MutationObserver(() => {
            const element = document.querySelector(selector) as HTMLElement;
            if (element) {
                observer.disconnect();
                clearTimeout(timeoutId);
                resolve(element);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        const timeoutId = setTimeout(() => {
            observer.disconnect();
            reject(new Error(""));
        }, timeout);
    });
};

const waitForEventAndClick = async (eventId: string) => {
    const id = getEventId(eventId);
    const selector = `#${id}`;
    try {
        const el = await waitForEvent(selector);
        alert("EDW!");
        el.click();
    } catch (ex) {
        console.log(ex);
    }
};

export default waitForEventAndClick;
