import GearSpinner from "./GearSpinner";
import Map from "./Map";
import "./MapPlaceholder.css";

export default function MapPlaceholder({ position }) {
  return (
    <div className="map-placeholder">
      {position ? <Map position={position} /> : <GearSpinner />}
    </div>
  );
}
