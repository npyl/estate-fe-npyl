import { DrawShape } from "@/components/Map/types";

const setCircleEvents = (shape: DrawShape, onChange: VoidFunction) => {
  const l0 = google.maps.event.addListener(shape, "dragend", onChange);
  const l1 = google.maps.event.addListener(shape, "radius_changed", onChange);
  const l2 = google.maps.event.addListener(shape, "center_changed", onChange);
  return [l0, l1, l2];
};

export default setCircleEvents;
