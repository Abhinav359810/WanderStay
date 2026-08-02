import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ListingMap({ listing }) {

    const [lng, lat] = listing.geometry.coordinates;
    const position = [lat, lng];

    return (
        <MapContainer
            center={position}
            zoom={13}
            style={{ height: "380px", width: "100%" }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position}>
                <Popup>
                    {listing.title}
                </Popup>
            </Marker>
        </MapContainer>
    );
}