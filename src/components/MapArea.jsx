import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const MapArea = ({ markers, setMarkers, reverseGeocoding, setOriginSuggestions, setIsOriginPinned, setDestinationSuggestions, setIsDestinationPinned, route }) => {

    const MapClickHandler = () => {
        useMapEvents({
          click(e) {
            if (markers.length < 2) {
              setMarkers([...markers, [e.latlng.lat, e.latlng.lng]]);
              if (markers.length === 0) {
                reverseGeocoding(0, e.latlng.lat, e.latlng.lng);
                setOriginSuggestions([]);
                setIsOriginPinned(true);
              } else if (markers.length === 1) {
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
            zoom={14}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapClickHandler />

            {markers.map((pos, idx) => (
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