const drawPolygon = (
    paths: google.maps.LatLngLiteral[][],
    map: google.maps.Map,
    changeable: boolean
) => {
    const polygonConfig = {
        clickable: true,
        editable: changeable,
        draggable: changeable,
        paths: paths,
        map: map,
        fillColor: "cyan",
        fillOpacity: 0.15,
        strokeWeight: 1,
        zIndex: 1,
    };

    return new google.maps.Polygon({ ...polygonConfig, map });
};

export default drawPolygon;
