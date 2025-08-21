import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";
import { useDebounce } from "react-use";
import MapArea from "../components/MapArea";
import InputForm from "../components/InputForm";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "../components/Spinner";

const LocationSearch = () => {
  const FareResult = React.lazy(() => import("../components/FareResult"));
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
  const [fareDetails, setFareDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // input field functions
  const handleChangeInput = (e, index) => {
    const value = e.target.value;
    if (index === 0) {
      if (!isOriginPinned || markers[0] == null) {
        setStartLocation(value);
        setIsOriginSuggestionSelected(false);
      }
    } else if (index === 1) {
      if (!isDestinationPinned || markers[1] == null) {
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
    setFareDetails({});
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

    index === 0 ? setOriginSuggestions([]) : setDestinationSuggestions([]);
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
    setFareDetails({});
    setIsSubmitted(false);
  };

  const calculateFare = (distance, duration, vehicleType, passengerType) => {
    if (!distance || !vehicleType) return 0;
    let multiplier = passengerType === "Regular" ? 1 : 0.8;
    let baseFare = 0;
    let baseKm = 0;
    let perKmRate = 0;
    let farePerMinute = vehicleType === "Taxi" ? 2 : 0;
    let distanceFare = 0;
    let totalFare = 0;

    switch (vehicleType) {
      case "Traditional_Jeepney":
        baseFare = 13;
        baseKm = 4;
        perKmRate = 1.8;
        break;
      case "Airconditioned_E-Jeepney":
        baseFare = 15;
        baseKm = 4;
        perKmRate = 1.8;
        break;
      case "Non-Airconditioned_E-Jeepney":
        baseFare = 15;
        baseKm = 4;
        perKmRate = 2.2;
        break;
      case "UV_Express":
        baseFare = 15;
        baseKm = 4;
        perKmRate = 2.5;
        break;
      case "Taxi":
        baseFare = 50;
        perKmRate = 13.5;
        break;
      case "Ordinary_City_Bus":
        baseFare = 13;
        baseKm = 5;
        perKmRate = 2.25;
        break;
      case "Airconditioned_City_Bus":
        baseFare = 15;
        baseKm = 5;
        perKmRate = 2.65;
        break;
      case "Ordinary_Provincial_Bus":
        baseFare = 11;
        baseKm = 5;
        perKmRate = 1.9;
        break;
      case "Airconditioned_Provincial_Bus":
        baseFare = 10.5;
        baseKm = 5;
        perKmRate = 2.1;
        break;
      case "Deluxe_Provincial_Bus":
        baseFare = 11.25;
        baseKm = 5;
        perKmRate = 2.25;
        break;
      case "Super_Deluxe_Provincial_Bus":
        baseFare = 11.75;
        baseKm = 5;
        perKmRate = 2.35;
        break;
      case "Luxury_Provincial_Bus":
        baseFare = 14.5;
        baseKm = 5;
        perKmRate = 2.9;
        break;
      default:
        return 0;
    }

    distanceFare =
      Math.round(distance) < baseKm
        ? 0
        : vehicleType === "Taxi"
        ? perKmRate * Math.round(distance)
        : perKmRate * (Math.round(distance) - baseKm);
    if (vehicleType === "taxi") {
      totalFare =
        (baseFare + distanceFare + farePerMinute * (duration / 60)) *
        multiplier;
    } else {
      totalFare =
        Math.round(distance) < baseKm
          ? baseFare * multiplier
          : (baseFare + distanceFare) * multiplier;
    }

    return {
      baseFare: baseFare,
      baseKm: baseKm,
      distance: distance,
      duration: duration,
      vehicleType: vehicleType,
      passengerType: passengerType,
      distanceFare: distanceFare,
      totalFare: totalFare,
    };
  };

  // fetching locations and routes
  const reverseGeocoding = async (index, lat, long) => {
    const endpoint = `https://api.locationiq.com/v1/reverse?key=${apiKey}&lat=${lat}&lon=${long}&format=json`;
    try {
      setIsLoading(true);
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data.display_name.split(", ").at(-1) !== "Philippines") {
        if (index === 0) {
          setMarkers((prev) => [null, prev[1]]);
          setIsOriginPinned(false);
          setStartLocation("");
        } else if (index === 1) {
          setMarkers((prev) => [prev[0], null]);
          setIsDestinationPinned(false);
          setEndLocation("");
        }
        return;
      }
      index === 0
        ? setStartLocation(data.display_name)
        : setEndLocation(data.display_name);
    } catch (error) {
      console.error("Error fetching reverse geocoding: ", error);
      if (index === 0) {
        setStartLocation("");
        setIsOriginPinned(false);
      } else if (index === 1) {
        setEndLocation("");
        setIsDestinationPinned(false);
      }
      setMarkers((prev) => {
        const updated = [...prev];
        updated[index] = null;
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRoute = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
          setDuration(data.routes[0].duration);
          setDistance((data.routes[0].distance / 1000).toFixed(2));
          setFareDetails(
            calculateFare(
              data.routes[0].distance / 1000,
              data.routes[0].duration,
              vehicleType,
              passengerType
            )
          );
          setIsSubmitted(true);
        }
      } catch (err) {
        console.error("Error fetching route:", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
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
  }, [markers[0], debouncedStartLocation, isOriginSuggestionSelected]);

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
  }, [markers[1], debouncedEndLocation, isDestinationSuggestionSelected]);

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

      <section className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[95%] md:w-auto md:left-auto md:translate-x-0 md:right-2 md:top-2 max-w-sm z-[9999] bg-[#fbfdfb] rounded-md shadow-xl pointer-events-auto h-fit overflow-hidden">


        <AnimatePresence initial={false} mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="input"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full relative"
            >
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
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-white/80 z-10"
                >
                  <Spinner />
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="fare"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full relative"
            >
              <Suspense fallback={null}>
                <FareResult
                  fareDetails={fareDetails}
                  startLocation={startLocation}
                  endLocation={endLocation}
                  setIsSubmitted={setIsSubmitted}
                  error={error}
                />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default LocationSearch;
