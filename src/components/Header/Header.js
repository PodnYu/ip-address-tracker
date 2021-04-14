import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
import InfoBlock from "../InfoBlock/InfoBlock";

export default function Header({ locationInfo, setLocationInfo }) {
  return (
    <div className="header">
      <div className="logo">IP Address Tracker</div>
      <SearchBar
        locationInfo={locationInfo}
        setLocationInfo={setLocationInfo}
      />
      <InfoBlock locationInfo={locationInfo} />
    </div>
  );
}
