import * as React from "react";

export const HereMap = (props) => {
  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null);

  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */
  React.useLayoutEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: process.env.REACT_APP_HERE_KEY,
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 40, lng: -77 },
      zoom: 7,
      pixelRatio: window.devicePixelRatio || 1,
    });
    var routingParameters = {
      routingMode: "fast",
      transportMode: "car",
      origin: `${props.originLat},${props.originLong}`,
      destination: `${props.destinationLat},${props.destinationLong}`,
      return: "polyline",
    };

    var onResult = function (result) {
      // ensure that at least one route was found
      if (result.routes.length) {
        result.routes[0].sections.forEach((section) => {
          // Create a linestring to use as a point source for the route line
          let linestring = H.geo.LineString.fromFlexiblePolyline(
            section.polyline
          );

          // Create a polyline to display the route:
          let routeLine = new H.map.Polyline(linestring, {
            style: { strokeColor: "#09C6F9", lineWidth: 3 },
          });

          // Create a marker for the start point:
          let startMarker = new H.map.Marker(section.departure.place.location);

          // Create a marker for the end point:
          let endMarker = new H.map.Marker(section.arrival.place.location);

          // Add the route polyline and the two markers to the map:
          hMap.addObjects([routeLine, startMarker, endMarker]);

          // Set the map's viewport to make the whole route visible:
          hMap
            .getViewModel()
            .setLookAtData({ bounds: routeLine.getBoundingBox() });
        });
      }
    };
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
    const ui = H.ui.UI.createDefault(hMap, defaultLayers);
    // Get an instance of the routing service version 8:
    var router = platform.getRoutingService(null, 8);
    // Call calculateRoute() with the routing parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    router.calculateRoute(routingParameters, onResult, function (error) {
      alert(error.message);
    });
    //generate markers
    /* var icon = new H.map.Icon('https://cdn0.iconfinder.com/data/icons/daily-boxes/150/phone-box-32.png'); */

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef, props /*  props.trips */]); // This will run this hook every time this ref is updated

  return <div className="map" ref={mapRef} />;
};
