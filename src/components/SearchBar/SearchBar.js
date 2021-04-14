import { useState, useEffect, useRef, useCallback } from "react";
import "./SearchBar.css";
import * as classNames from "classnames";

export default function SearchBar({ locationInfo, setLocationInfo }) {
  const searchInputRef = useRef();

  const [error, setError] = useState(false);

  function getData(url, cb) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        cb(JSON.parse(data));
      })
      .catch((error) => console.error(error));
  }

  const isIPAddressValid = (ip) => {
    if (!/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/.test(ip))
      return false;

    for (const number of ip.split(".")) {
      if (+number > 255) return false;
    }

    return true;
  };

  const isDomainValid = (domain) => {
    return /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/.test(domain);
  };

  const isInputValid = (input) => {
    return isDomainValid(input) || isIPAddressValid(input);
  };

  const getMyIpUrl = "http://localhost:5005/getMyIP";
  const getLocationUrl = "http://localhost:5005/getLocation";

  const getGetLocationByIPLink = (ip) => `${getLocationUrl}?ipAddress=${ip}`;

  const getGetLocationByDomainLink = (domain) =>
    `${getLocationUrl}?domain=${domain}`;

  const getGetLocationLink = useCallback((input) => {
    if (isDomainValid(input)) return getGetLocationByDomainLink(input);
    if (isIPAddressValid(input)) return getGetLocationByIPLink(input);
  }, []);

  const getLocation = useCallback(
    (ip) => {
      getData(getGetLocationLink(ip), (locationInfo) => {
        console.log(locationInfo);
        if (locationInfo.code === 422) {
          setError(true);
          searchInputRef.current.value = "Invalid ip address";
          return;
        }
        setLocationInfo(locationInfo);
      });
    },
    [getGetLocationLink, setLocationInfo]
  );

  const search = (ip) => {
    setLocationInfo(null);
    getLocation(ip);
  };

  useEffect(() => {
    getData(getMyIpUrl, (data) => {
      getLocation(data.ip);
    });
  }, [getLocation]);

  const handleSearchButtonClick = (e) => {
    if (error) return;

    const value = searchInputRef.current.value.trim();
    if (!isInputValid(value)) return;

    if (value === "") {
      return;
    }

    searchInputRef.current.blur();
    search(value);
  };

  const handleSearchInputFocus = (e) => {
    if (!error) return;

    searchInputRef.current.value = "";
    setError(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchButtonClick(null);
    }
  };

  return (
    <div className="search-bar">
      <input
        className={classNames({
          "search-input": true,
          "search-input-invalid": !!error,
        })}
        placeholder="Search for any IP address or domain..."
        ref={searchInputRef}
        onFocus={handleSearchInputFocus}
        onKeyDown={handleKeyDown}
      />
      <div
        className={classNames({
          "search-button": true,
          "search-button-invalid": !!error,
        })}
        onClick={handleSearchButtonClick}
      >
        <img
          src="./images/icon-arrow.svg"
          className="arrow-image"
          alt="arrow"
        />
      </div>
    </div>
  );
}
