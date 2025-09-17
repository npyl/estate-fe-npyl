import { DrawShape } from "@/components/Map/types";

const setRectangleEvents = (shape: DrawShape, onChange: VoidFunction) => {
  const l0 = google.maps.event.addListener(shape, "bounds_changed", onChange);
  const l1 = google.maps.event.addListener(shape, "dragend", onChange);
  return [l0, l1];
};

export default setRectangleEvents;
