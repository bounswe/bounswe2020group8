import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 41.08478565714733, lng: 29.051027297973633 }}
      onClick={(ev) => {
        props.addLocation({ lat: ev.latLng.lat(), lng: ev.latLng.lng() });
        console.log("latitide = ", ev.latLng.lat());
        console.log("longitude = ", ev.latLng.lng());
      }}
    >
      {props.markerLocations.map((marker) => (
        <Marker
          onClick={() => props.removeLocation(marker.lat, marker.lng)}
          position={{
            lat: marker.lat,
            lng: marker.lng,
          }}
        />
      ))}
    </GoogleMap>
  ))
);

export default MapComponent;
