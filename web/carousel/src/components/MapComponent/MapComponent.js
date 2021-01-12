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
        props.addLocation({
          latitude: ev.latLng.lat(),
          longitude: ev.latLng.lng(),
        });
      }}
    >
      {props.markerLocations.map((marker) => (
        <Marker
          key={marker.latitude + "," + marker.longitude}
          onClick={() =>
            props.removeLocation(marker.latitude, marker.longitude)
          }
          position={{
            lat: marker.latitude,
            lng: marker.longitude,
          }}
        />
      ))}
    </GoogleMap>
  ))
);

export default MapComponent;
