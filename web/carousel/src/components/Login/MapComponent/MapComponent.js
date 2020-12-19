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
        props.setLocation({ lat: ev.latLng.lat(), lng: ev.latLng.lng() });
        console.log("latitide = ", ev.latLng.lat());
        console.log("longitude = ", ev.latLng.lng());
      }}
    >
      {props.markerLocation && (
        <Marker
          position={{
            lat: props.markerLocation.lat,
            lng: props.markerLocation.lng,
          }}
        />
      )}
    </GoogleMap>
  ))
);

export default MapComponent;
