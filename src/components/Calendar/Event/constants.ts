// left-factor
const LF = 10;

/**
 * Make a (div) element id out of `eventId`
 * @param eventId
 * @returns currently returns exactly the same for backwards compatibility with possible places where we are not using this method
 */
const getEventId = (eventId: string) => eventId;

const getEventTestId = (eventId: string) => `EventTestId-${eventId}`;

export { LF, getEventId, getEventTestId };
