import { useState, useMemo } from "react";
import Header from "./components/Header/Header";
import MapPlaceholder from "./components/Map/MapPlaceholder";

function App() {
  const [locationInfo, setLocationInfo] = useState(null);

  return (
    <>
      <Header locationInfo={locationInfo} setLocationInfo={setLocationInfo} />
      {useMemo(
        () => (
          <MapPlaceholder
            position={
              locationInfo && [
                locationInfo.location.lat,
                locationInfo.location.lng,
              ]
            }
          />
        ),
        [locationInfo]
      )}
    </>
  );
}

export default App;
