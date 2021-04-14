import { Icon } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapConsumer,
} from "react-leaflet";
import "./Map.css";

export default function Map({ position }) {
  const markerIcon = new Icon({ iconUrl: "./images/icon-location.svg" });
  const zoom = 5;

  return (
    <MapContainer
      id="map-container"
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
    >
      <MapConsumer>
        {(map) => {
          map.setView(position, zoom, { animate: true, duration: 1 });
          return null;
        }}
      </MapConsumer>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={markerIcon}>
        <Popup>{`[${position[0]}, ${position[1]}]`}</Popup>
      </Marker>
    </MapContainer>
  );
}
