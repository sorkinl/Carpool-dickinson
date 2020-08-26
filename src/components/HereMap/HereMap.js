import * as React from 'react';

export const HereMap = (props) => {
  console.log(props)

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
        apikey: process.env.REACT_APP_HERE_KEY
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 40, lng: -77 },
      zoom: 7,
      pixelRatio: window.devicePixelRatio || 1
    });
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    //generate markers
    /* var icon = new H.map.Icon('https://cdn0.iconfinder.com/data/icons/daily-boxes/150/phone-box-32.png'); */
    if(props.trips){
    props.trips.map(
      x=>{
        console.log("doing")
        var marker = new H.map.Marker({ lat: x.destination.latitude, lng: x.destination.longitude }/* , { icon: icon } */);
        hMap.addObject(marker);
      }
    )
    }
    

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef, props.trips]); // This will run this hook every time this ref is updated

  return <div className="map" ref={mapRef}  />;
};