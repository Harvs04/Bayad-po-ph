import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";
import { useDebounce } from "react-use";
import MapArea from "../components/MapArea";
import InputForm from "../components/InputForm";
import FareResult from "../components/FareResult";

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
  const [fareDetails, setFareDetails] = useState({});

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
    let farePerMinute = vehicleType === 'Taxi' ? 2 : 0;
    let distanceFare = 0;
    let totalFare = 0;

    switch (vehicleType) {
      case "Traditional_Jeepney":
        baseFare = 13;
        baseKm = 4;
        perKmRate = 1.80;
        break;
      case "Airconditioned_E-Jeepney":
        baseFare = 15;
        baseKm = 4;
        perKmRate = 1.80;
        break;
      case "Non-Airconditioned_E-Jeepney":
        baseFare = 15;
        baseKm = 4;
        perKmRate = 2.20;
        break;
      case "UV_Express":
        baseFare = 15;
        baseKm = 4;
        perKmRate = 2.50;
        break;
      case "Taxi":
        baseFare = 50;
        perKmRate = 13.50;
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
        perKmRate = 1.90;
        break;
      case "Airconditioned_Provincial_Bus":
        baseFare = 10.50;
        baseKm = 5;
        perKmRate = 2.10;
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
        baseFare = 14.50;
        baseKm = 5;
        perKmRate = 2.90;
        break;
      default:
        return 0;
    }

    distanceFare = Math.round(distance) < baseKm ? 0 : vehicleType === "Taxi" ? (perKmRate * Math.round(distance)) : perKmRate * (Math.round(distance) - baseKm);
    if (vehicleType === "taxi") {
      totalFare = (baseFare + distanceFare + (farePerMinute * (duration / 60))) * multiplier;
    } else {  
      totalFare = Math.round(distance) < baseKm ? (baseFare * multiplier) : (baseFare + distanceFare) * multiplier;
    }

    return {
      "baseFare": baseFare,
      "baseKm": baseKm,
      "distance": distance,
      "duration": duration,
      "vehicleType": vehicleType,
      "passengerType": passengerType,
      "distanceFare": distanceFare,
      "totalFare": totalFare
    }
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
          setFareDetails(calculateFare(data.routes[0].distance / 1000, data.routes[0].duration, vehicleType, passengerType));
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
        {isSubmitted && route.length > 0 && fareDetails !== undefined ? (
          <FareResult fareDetails={fareDetails} startLocation={startLocation} endLocation={endLocation} error={error} />
          ) : null
        }
      </section>
    </div>
  );
};

export default LocationSearch;
