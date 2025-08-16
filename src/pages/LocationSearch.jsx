import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";
import { useDebounce } from "react-use";
import MapArea from "../components/MapArea";

const LocationSearch = () => {
  const apiKey = import.meta.env.VITE_LOCATION_IQ_PUBLIC_TOKEN;

  const [debouncedStartLocation, setDebouncedStartLocation] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [debouncedEndLocation, setDebouncedEndLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [passengerType, setPassengerType] = useState("");

  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [currentLoc, setCurrentLoc] = useState(null);
  const [error, setError] = useState(null);
  const [markers, setMarkers] = useState([null, null]);
  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(null);
  const [isOriginSuggestionSelected, setIsOriginSuggestionSelected] =
    useState(false);
  const [isDestinationSuggestionSelected, setIsDestinationSuggestionSelected] =
    useState(false);
  const [isOriginPinned, setIsOriginPinned] = useState(false);
  const [isDestinationPinned, setIsDestinationPinned] = useState(false);
  const [didUseCurrentLocation, setDidUseCurrentLocation] = useState([
    false,
    false,
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChangeInput = (e, index) => {
    const value = e.target.value;
    if (index === 0) {
      if (!isOriginPinned) {
        setStartLocation(value);
        setIsOriginSuggestionSelected(false);
      }
    } else if (index === 1) {
      if (!isDestinationPinned) {
        setEndLocation(value);
        setIsDestinationSuggestionSelected(false);
      }
    }
  };

  const handleUserCurrentLocation = (index) => {
    if (!currentLoc) {
      alert("Please allow location access to use this feature.");
      return;
    }
    reverseGeocoding(index, currentLoc.latitude, currentLoc.longitude);
    setDidUseCurrentLocation((prev) =>
      index === 0 ? [true, prev[1]] : [prev[0], true]
    );
    setMarkers((prev) =>
      index === 0
        ? [[currentLoc.latitude, currentLoc.longitude], prev[1]]
        : [prev[0], [currentLoc.latitude, currentLoc.longitude]]
    );
  };

  const handleClearAll = () => {
    if (startLocation) {
      setStartLocation("");
      setIsOriginPinned(false);
    }

    if (endLocation) {
      setEndLocation("");
      setIsDestinationPinned(false);
    }

    if (vehicleType) {
      setVehicleType("");
    }

    if (passengerType) {
      setPassengerType("");
    }
    setMarkers([null, null]);
    setRoute([]);
    setDistance(null);
    setIsSubmitted(false);
  };

  const reverseGeocoding = async (index, lat, long) => {
    const endpoint = `https://api.locationiq.com/v1/reverse?key=${apiKey}&lat=${lat}&lon=${long}&format=json`;
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (index === 0) {
        setStartLocation(data.display_name);
      } else if (index === 1) {
        setEndLocation(data.display_name);
      }
    } catch (error) {
      console.error("Error fetching reverse geocoding: ", error);
      return "";
    }
  };

  const fetchRoute = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (markers.length === 2) {
      const [start, end] = markers;
      const url = `https://us1.locationiq.com/v1/directions/driving/${start[1]},${start[0]};${end[1]},${end[0]}?key=${apiKey}&overview=simplified&annotations=false`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.routes && data.routes.length > 0) {
          const encoded = data.routes[0].geometry;
          const coords = polyline.decode(encoded);

          setRoute(coords);
          setDistance((data.routes[0].distance / 1000).toFixed(2));
        }
      } catch (err) {
        console.error("Error fetching route:", err);
      }
    }
  };

  const handleSelectSuggestion = (place, index) => {
    setMarkers((prevMarkers) => {
      const updated = [...prevMarkers];
      updated[index] = [place.lat, place.lon];
      return updated;
    });
    if (index === 0) {
      setStartLocation(place.display_name);
      setOriginSuggestions([]);
      setIsOriginSuggestionSelected(true);
    } else if (index === 1) {
      setEndLocation(place.display_name);
      setDestinationSuggestions([]);
      setIsDestinationSuggestionSelected(true);
    }
  };

  const handleDeletePoint = (index) => {
    setRoute([]);
    setDistance(null);
    setIsSubmitted(false);

    if (index === 0) {
      setStartLocation("");
      setMarkers((prev) => [null, prev[1]]);
      setIsOriginPinned(false)
    } else if (index === 1) {
      setEndLocation("");
      setMarkers((prev) => [prev[0], null]);
      setIsDestinationPinned(false)
    }
  };

  useDebounce(() => setDebouncedStartLocation(startLocation), 500, [
    startLocation,
  ]);

  useDebounce(() => setDebouncedEndLocation(endLocation), 500, [endLocation]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentLoc({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    const fetchStartLocations = async () => {
      if (
        debouncedStartLocation.trim().length === 0 ||
        isOriginSuggestionSelected ||
        isOriginPinned ||
        didUseCurrentLocation[0]
      )
        return;

      const endpoint = `https://api.locationiq.com/v1/autocomplete?key=${apiKey}&q=${debouncedStartLocation}&countrycodes=ph`;
      try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setOriginSuggestions(data);
      } catch (error) {
        console.error("Error fetching locations: ", error);
      }
    };

    fetchStartLocations();
  }, [debouncedStartLocation, isOriginSuggestionSelected]);

  useEffect(() => {
    const fetchEndLocations = async () => {
      if (
        debouncedEndLocation.trim().length === 0 ||
        isDestinationSuggestionSelected ||
        isDestinationPinned ||
        didUseCurrentLocation[1]
      )
        return;

      const endpoint = `https://api.locationiq.com/v1/autocomplete?key=${apiKey}&q=${debouncedEndLocation}&countrycodes=ph`;
      try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setDestinationSuggestions(data);
      } catch (error) {
        console.error("Error fetching locations: ", error);
      }
    };

    fetchEndLocations();
  }, [debouncedEndLocation, isDestinationSuggestionSelected]);

  return (
    <div className="relative">
      <div className="h-screen">
        <MapArea
          currentLocation={currentLoc}
          markers={markers}
          setMarkers={setMarkers}
          reverseGeocoding={reverseGeocoding}
          setOriginSuggestions={setOriginSuggestions}
          setIsOriginPinned={setIsOriginPinned}
          setDestinationSuggestions={setDestinationSuggestions}
          setIsDestinationPinned={setIsDestinationPinned}
          route={route}
          distance={distance}
          isSubmitted={isSubmitted}
        />
      </div>

      <section className="absolute bottom-0 right-4 md:top-4 z-[9999] bg-[#fbfdfb] rounded-lg shadow-sm pointer-events-auto max-w-sm h-fit">
        <div className="flex items-center justify-center gap-2 w-full rounded-t-lg p-4 bg-[#4CAF4F]">
          <img
            src="./../src/assets/jeepney_white.svg"
            alt="bayadpo_logo"
            className="w-6"
          />
          <p className="text-white">
            Please provide the following information.
          </p>
        </div>
        <form className="p-4 space-y-2.5">
          <div className="relative flex-col items-start gap-1 w-full">
            <label
              htmlFor="source"
              className="block mb-1 text-sm font-medium text-[#4d4d4d]"
            >
              <div className="flex items-center gap-1">
                Pickup point{" "}
                <span className="text-red-500 text-xs">(Required)</span>
                <div className="relative group">
                  <svg
                    className="w-4 cursor-pointer"
                    fill="#4d4d4d"
                    xmlns="http://www.w3.org/2000/svg"
                    id="mdi-information"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                  </svg>

                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 mt-2 w-max max-w-xs px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                    You may pin a location if this field is empty.
                  </div>
                </div>
              </div>
            </label>

            <div className="relative flex items-center w-full">
              <input
                id="source"
                type="text"
                value={startLocation}
                onChange={(e) => handleChangeInput(e, 0)}
                className="p-2 pr-16 text-[15px] text-[#4d4d4d] border border-[#4d4d4d] rounded-md w-full"
              />

              <button
                type="button"
                onClick={() => handleUserCurrentLocation(0)}
                className="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-blue-50 rounded p-1 transition-colors"
                title="Use current location"
              >
                <svg
                  fill="#2196F3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => handleDeletePoint(0)}
                disabled={markers[0] === null}
                title="Remove origin"
                className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer enabled:hover:bg-red-50 rounded p-1 transition-colors disabled:cursor-not-allowed"
              >
                <svg
                  fill="#EB2020"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                </svg>
              </button>
            </div>
            {originSuggestions.length > 0 && debouncedStartLocation && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-50 max-h-60 overflow-y-auto">
                {originSuggestions.map((s) => (
                  <li
                    key={s.osm_id}
                    onClick={() => handleSelectSuggestion(s, 0)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {s.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative w-full">
            <label
              htmlFor="destination"
              className="block mb-1 text-sm font-medium text-[#4d4d4d]"
            >
              <div className="flex items-center gap-1">
                Drop-off point{" "}
                <span className="text-red-500 text-xs">(Required)</span>
                <div className="relative group">
                  <svg
                    className="w-4 cursor-pointer"
                    fill="#4d4d4d"
                    xmlns="http://www.w3.org/2000/svg"
                    id="mdi-information"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                  </svg>

                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 mt-2 w-max max-w-xs px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                    You may pin a location if the field is empty.
                  </div>
                </div>
              </div>
            </label>

            <div className="relative flex items-center w-full">
              <input
                id="destination"
                type="text"
                value={endLocation}
                onChange={(e) => handleChangeInput(e, 1)}
                className="p-2 pr-16 text-[15px] text-[#4d4d4d] border border-[#4d4d4d] rounded-md w-full"
              />

              <button
                type="button"
                onClick={() => handleUserCurrentLocation(1)}
                className="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-blue-50 rounded p-1 transition-colors"
                title="Use current location"
              >
                <svg
                  fill="#2196F3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => handleDeletePoint(1)}
                disabled={markers[1] === null}
                title="Remove destination"
                className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer enabled:hover:bg-red-50 rounded p-1 transition-colors disabled:cursor-not-allowed"
              >
                <svg
                  fill="#EB2020"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                </svg>
              </button>
            </div>
            {destinationSuggestions.length > 0 && debouncedEndLocation && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-50 max-h-60 overflow-y-auto">
                {destinationSuggestions.map((s) => (
                  <li
                    key={s.osm_id}
                    onClick={() => handleSelectSuggestion(s, 1)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {s.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col items-start gap-1">
            <label
              htmlFor="vehicle_type"
              className="text-sm font-medium text-[#4d4d4d]"
            >
              Vehicle Type{" "}
              <span className="text-red-500 text-xs">(Required)</span>
            </label>
            <select
              id="vehicle_type"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="p-2 text-[15px] text-[#4d4d4d] border border-[#4d4d4d] rounded-md w-full"
            >
              <option value="" defaultValue={""} disabled></option>
              <option value="traditional_jeepney">Traditional Jeepney</option>
              <option value="e_jeepney">Electric Jeepney</option>
              <option value="uv_express">UV Express</option>
              <option value="taxi">Taxi</option>
              <option value="ordinary_city_bus">Ordinary City Bus</option>
              <option value="aircon_city_bus">Airconditioned City Bus</option>
              <option value="ordinary_prov_bus">Ordinary Provincial Bus</option>
              <option value="aircon_prov_bus">
                Airconditioned Provincial Bus
              </option>
              <option value="tricycle" disabled>
                Tricycle (fares vary per TODA)
              </option>
            </select>
          </div>

          <div className="flex flex-col items-start gap-1">
            <label
              htmlFor="passenger_type"
              className="text-sm font-medium text-[#4d4d4d]"
            >
              Passenger Type{" "}
              <span className="text-red-500 text-xs">(Required)</span>
            </label>
            <select
              id="passenger_type"
              value={passengerType}
              onChange={(e) => setPassengerType(e.target.value)}
              className="p-2 text-[15px] text-[#4d4d4d] border border-[#4d4d4d] rounded-md w-full"
            >
              <option value="" defaultChecked={""} disabled></option>
              <option value="regular">Regular</option>
              <option value="student">Student</option>
              <option value="pwd">Person With Disability</option>
              <option value="senior_citizen">Senior Citizen</option>
            </select>
          </div>

          <button
            className="bg-[#4CAF4F] p-2 rounded-md text-white text-sm enabled:cursor-pointer enabled:hover:bg-[#4CAF4F]/90 mt-2 w-full disabled:hover:cursor-not-allowed"
            disabled={
              startLocation.trim() === "" ||
              endLocation.trim() === "" ||
              passengerType === "" ||
              vehicleType === ""
            }
            onClick={fetchRoute}
          >
            Calculate Fare
          </button>

          <button
            className="bg-red-500 p-2 rounded-md text-white text-sm enabled:cursor-pointer enabled:hover:bg-red-500/90 w-full disabled:hover:cursor-not-allowed"
            disabled={
              startLocation.trim() === "" &&
              endLocation.trim() === "" &&
              passengerType === "" &&
              vehicleType === ""
            }
            onClick={handleClearAll}
          >
            Clear All
          </button>
        </form>
        {route.length > 0 && (
          <>
            <hr className="mb-3 mx-4 border-slate-400" /> 
            <div className="m-4 p-4 rounded bg-[#4CAF4F] text-white text-sm">
            Results: 
            {distance && <p className="mt-2">Distance: {distance} km</p>}
            {currentLoc && (
              <p className="mt-2">
                You are currently at:{" "}
                {currentLoc?.latitude + ", " + currentLoc?.longitude}
              </p>
            )}
            {error && <span className="text-center text-red-500 text-sm">{error}</span>}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default LocationSearch;
