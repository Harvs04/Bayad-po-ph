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
import markerIconPng from "leaflet/dist/images/marker-icon.png";

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
  markers,
  setMarkers,
  reverseGeocoding,
  setOriginSuggestions,
  setIsOriginPinned,
  setDestinationSuggestions,
  setIsDestinationPinned,
  route,
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

  return (
    <>
      <MapContainer
        center={[14.693099, 121.058873]}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterToOrigin markers={markers} />
        <MapClickHandler />

        {markers
          .filter((pos) => Array.isArray(pos) && pos.length === 2)
          .map((pos, idx) => (
            <Marker
              key={idx}
              position={pos}
              icon={L.icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })}
            >
              <Popup>Point {idx + 1}</Popup>
            </Marker>
          ))}

        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </>
  );
};

export default MapArea;
