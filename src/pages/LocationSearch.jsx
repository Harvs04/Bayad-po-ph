import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";
import { useDebounce } from "react-use";
import MapArea from "../components/MapArea";
import InputForm from "../components/InputForm";

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
  const [duration, setDuration] = useState(0);
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
  const [fare, setFare] = useState(0);

  // input field functions
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
    setDuration(0);
    setDistance(null);
    setIsSubmitted(false);

    if (index === 0) {
      setStartLocation("");
      setMarkers((prev) => [null, prev[1]]);
      setIsOriginPinned(false);
    } else if (index === 1) {
      setEndLocation("");
      setMarkers((prev) => [prev[0], null]);
      setIsDestinationPinned(false);
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
    setDuration(0);
    setDistance(null);
    setIsSubmitted(false);
  };

  const calculateFare = (distance, duration, vehicleType, passengerType) => {
    if (!distance || !vehicleType) return 0;
    let multiplier = passengerType === "regular" ? 1 : 0.8;
    let baseFare = 0;
    let baseKm = 0;
    let perKmRate = 0;
    let farePerMinute = 2;

    switch (vehicleType) {
      case "traditional_jeepney":
        baseFare = 13;
        baseKm = 4;
        perKmRate = 1.80;
        break;
      case "aircon_e_jeepney":
        baseFare = 15;
        baseKm = 4;
        perKmRate = 1.80;
        break;
      case "non_aircon_e_jeepney":
        baseFare = 15;
        baseKm = 4;
        perKmRate = 2.20;
        break;
      case "uv_express":
        baseFare = 15;
        baseKm = 4;
        perKmRate = 2.50;
        break;
      case "taxi":
        baseFare = 50;
        perKmRate = 13.50;
        break;
      case "ordinary_city_bus":
        baseFare = 13;
        baseKm = 5;
        perKmRate = 2.25;
        break;
      case "aircon_city_bus":
        baseFare = 15;
        baseKm = 5;
        perKmRate = 2.65;
        break;
      case "ordinary_prov_bus":
        baseFare = 11;
        baseKm = 5;
        perKmRate = 1.90;
        break;
      case "aircon_prov_bus":
        baseFare = 10.50;
        baseKm = 5;
        perKmRate = 2.10;
        break;
      case "deluxe_prov_bus":
        baseFare = 11.25;
        baseKm = 5;
        perKmRate = 2.25;
        break;
      case "super_deluxe_prov_bus":
        baseFare = 11.75;
        baseKm = 5;
        perKmRate = 2.35;
        break;
      case "luxury_prov_bus":
        baseFare = 14.50;
        baseKm = 5;
        perKmRate = 2.90;
        break;
      default:
        return 0;
    }

    if (vehicleType === "taxi") {
      return (baseFare + (perKmRate * Math.round(distance)) + (farePerMinute * (duration / 60))) * multiplier;
    }

    return Math.round(distance) < baseKm ? baseFare : (baseFare + perKmRate * (Math.round(distance) - baseKm)) * multiplier;
  }


  // fetching locations and routes 
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
        console.log(data);

        if (data.routes && data.routes.length > 0) {
          const encoded = data.routes[0].geometry;
          const coords = polyline.decode(encoded);

          setRoute(coords);
          setDuration(data.routes[0].duration);
          setDistance((data.routes[0].distance / 1000).toFixed(2));
          // setFare(calculateFare(data.routes[0].distance / 1000, data.routes[0].duration, vehicleType, passengerType));
          console.log("Fare: ", calculateFare(data.routes[0].distance / 1000, data.routes[0].duration, vehicleType, passengerType));
        }
      } catch (err) {
        console.error("Error fetching route:", err);
      }
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
        <InputForm
          startLocation={startLocation}
          handleChangeInput={handleChangeInput}
          handleUserCurrentLocation={handleUserCurrentLocation}
          handleDeletePoint={handleDeletePoint}
          markers={markers}
          originSuggestions={originSuggestions}
          debouncedStartLocation={debouncedStartLocation}
          handleSelectSuggestion={handleSelectSuggestion}
          endLocation={endLocation}
          destinationSuggestions={destinationSuggestions}
          debouncedEndLocation={debouncedEndLocation}
          vehicleType={vehicleType}
          setVehicleType={setVehicleType}
          passengerType={passengerType}
          setPassengerType={setPassengerType}
          fetchRoute={fetchRoute}
          handleClearAll={handleClearAll}
        />
        {route.length > 0 && (
          <>
            <hr className="mb-6 mx-4 border-slate-300" />

            <div className="m-4 space-y-4">
              {/* Results Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Route Results
                </h3>
              </div>

              {/* Main Results Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Distance Card */}
                {distance && (
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600">
                          Total Distance
                        </p>
                        <p className="text-2xl font-bold text-blue-800">
                          {distance} km
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Duration Card */}
                {distance && (
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-purple-600">
                          Estimated Time
                        </p>
                        <p className="text-2xl font-bold text-purple-800">
                          {Math.round((parseFloat(distance) / 40) * 60)} min
                        </p>
                        <p className="text-xs text-purple-500">@ 40 km/h avg</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Current Location Card */}
              {currentLoc && (
                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mt-0.5">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-600 mb-1">
                        Your Current Location
                      </p>
                      <p className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg border border-green-200 font-mono">
                        {currentLoc.latitude.toFixed(6)},{" "}
                        {currentLoc.longitude.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-red-600">Error</p>
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Route Summary */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-600">
                    Route Summary
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Waypoints:</span>
                    <span className="font-medium text-gray-700">
                      {route.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className="font-medium text-green-600">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default LocationSearch;
