import "./GearSpinner.css";
import spinner from "../../gear-spinner.svg";

export default function GearSpinner() {
  return (
    <div id="spinner-container">
        <img src={spinner} id="spinner" alt="spinner" />
    </div>  
  );
}