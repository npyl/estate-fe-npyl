import debugLog from "@/_private/debugLog";
import { DrawShape } from "../../../types";
import setCircleEvents from "./circle";
import setRectangleEvents from "./rectangle";
import setPolygonEvents from "./polygon";

const setShapeEvents = (shape: DrawShape, _onChange: VoidFunction) => {
    let mouseUpOccurred = false;
    let shapeChangedOccurred = false;

    const checkCompletion = () => {
        if (!mouseUpOccurred || !shapeChangedOccurred) return;
        _onChange();
    };

    const onMouseUpCb = () => {
        debugLog("Received mouseUp");
        mouseUpOccurred = true;
        checkCompletion();
    };

    const onChangeCb = () => {
        debugLog("Received _onChange");
        shapeChangedOccurred = true;
        checkCompletion();
    };

    // Set up temporary listeners for the promise
    const l0 = google.maps.event.addListenerOnce(shape, "mouseup", onMouseUpCb);

    let listeners: google.maps.MapsEventListener[] = [];

    // Use the existing listener setup functions
    if (shape instanceof google.maps.Circle)
        listeners = setCircleEvents(shape, onChangeCb);

    if (shape instanceof google.maps.Rectangle)
        listeners = setRectangleEvents(shape, onChangeCb);

    if (shape instanceof google.maps.Polygon)
        listeners = setPolygonEvents(shape, onChangeCb);

    return [l0, ...listeners];
};

export default setShapeEvents;
