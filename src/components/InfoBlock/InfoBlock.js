import "./InfoBlock.css";

export default function InfoBlock({ locationInfo }) {
  const info = locationInfo
    ? {
        ip: locationInfo.ip,
        location: `${locationInfo.location.city}, ${locationInfo.location.country} ${locationInfo.location.postalCode}`,
        timezone: `UTC${locationInfo.location.timezone}`,
        isp: locationInfo.isp,
      }
    : {
        ip: "",
        location: "",
        timezone: "",
        isp: "",
      };

  return (
    <div className="info-block">
      <div className="info-container ip-address-container">
        <div className="title">ip address</div>
        <div className="data">{info.ip}</div>
      </div>
      <div className="info-container location-container">
        <div className="title">location</div>
        <div className="data">{info.location}</div>
      </div>
      <div className="info-container timezone-container">
        <div className="title">timezone</div>
        <div className="data">{info.timezone}</div>
      </div>
      <div className="info-container isp-container">
        <div className="title">isp</div>
        <div className="data">{info.isp}</div>
      </div>
    </div>
  );
}
