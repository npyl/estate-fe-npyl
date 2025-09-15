const setPolygonEvents = (
  shape: google.maps.Polygon,
  onChange: VoidFunction
) => {
  const vertices = shape.getPath();

  // Listen to path modifications
  const l0 = vertices.addListener("set_at", onChange);
  const l1 = vertices.addListener("insert_at", onChange);
  const l2 = vertices.addListener("remove_at", onChange);

  // Listen to polygon drag events
  const l3 = google.maps.event.addListener(shape, "dragend", onChange);
  const l4 = google.maps.event.addListener(shape, "dragstart", onChange);

  const l5 = google.maps.event.addListener(shape, "paths_changed", onChange);

  return [l0, l1, l2, l3, l4, l5];
};

export default setPolygonEvents;
