import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

const RecenterToOrigin = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (Array.isArray(markers[0]) && markers[0].length === 2) {
      map.flyTo(markers[0], map.getZoom(), {
        animate: true,
        duration: 1.2,
      });
    }
  }, [markers[0], map]);

  return null;
};

const MapArea = ({
  currentLocation,
  markers,
  setMarkers,
  reverseGeocoding,
  setOriginSuggestions,
  setIsOriginPinned,
  setDestinationSuggestions,
  setIsDestinationPinned,
  route,
  distance,
  isSubmitted,
}) => {
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        if (markers[0] === null || markers[1] === null) {
          if (markers[0] === null) {
            setMarkers((prev) => {
              prev[0] = [e.latlng.lat, e.latlng.lng];
              return [...prev];
            });
            reverseGeocoding(0, e.latlng.lat, e.latlng.lng);
            setOriginSuggestions([]);
            setIsOriginPinned(true);
          } else if (markers[1] === null) {
            setMarkers((prev) => {
              prev[1] = [e.latlng.lat, e.latlng.lng];
              return [...prev];
            });
            reverseGeocoding(1, e.latlng.lat, e.latlng.lng);
            setDestinationSuggestions([]);
            setIsDestinationPinned(true);
          }
        }
      },
    });
    return null;
  };

  const RecenterToRoute = ({ markers, isSubmitted, distance }) => {
    const map = useMap();

    useEffect(() => {
      if (isSubmitted && markers[0] && markers[1]) {
        const bounds = [markers[0], markers[1]];
        map.flyToBounds(bounds, {
          padding: distance < 10 ? [150, 150] : [200, 200],
          duration: 1.2,
        });
      }
    }, [markers]);

    return null;
  };

  return (
    <>
      <MapContainer
        center={
          currentLocation
            ? [currentLocation.lat, currentLocation.lng]
            : [14.651477362493026, 121.0493153669049]
        }
        zoom={currentLocation ? 17 : 15}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterToOrigin markers={markers} />
        <RecenterToRoute
          markers={markers}
          isSubmitted={isSubmitted}
          distance={distance}
        />
        <MapClickHandler />

        {markers.map((pos, idx) => {
          if (!Array.isArray(pos) || pos.length !== 2) return null;

          const isOrigin = idx === 0; 
          const iconUrl = isOrigin
            ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
            : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png";

          return (
            <Marker
              key={idx}
              position={pos}
              icon={L.icon({
                iconUrl,
                shadowUrl:
                  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
              })}
            >
              <Popup>{isOrigin ? "Start Point" : "End Point"}</Popup>
            </Marker>
          );
        })}

        {route.length > 0 && <Polyline positions={route} color="green" />}
      </MapContainer>
    </>
  );
};

export default MapArea;
