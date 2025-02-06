
import { GoogleMap } from "@react-google-maps/api";
import { toast } from "react-toastify";

interface MapComponentProps {
  markerPosition: { lat: number; lng: number };
  setMarkerPosition: (pos: { lat: number; lng: number }) => void;
  setFormData: (data: any) => void;
  addressInputRef: React.RefObject<HTMLInputElement>;
  mapRef: React.RefObject<google.maps.Map | null>;
  markerRef: React.RefObject<google.maps.marker.AdvancedMarkerElement | null>;
  handleMapClick: (event: google.maps.MapMouseEvent) => void;
}

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const mapOptions = {
  mapId: import.meta.env.VITE_GOOGLE_MAPS_ID,
};

const MapComponent: React.FC<MapComponentProps> = ({
  markerPosition,
  setMarkerPosition,
  setFormData,
  addressInputRef,
  mapRef,
  markerRef,
  handleMapClick,
}) => {

  return (
<GoogleMap
  mapContainerStyle={mapContainerStyle}
  zoom={10}
  center={markerPosition}
  options={mapOptions}
  onClick={handleMapClick}
  onLoad={(map) => {
    (mapRef as React.MutableRefObject<google.maps.Map | null>).current = map;

    if (!markerRef.current) {
      (markerRef as React.MutableRefObject<google.maps.marker.AdvancedMarkerElement | null>).current =
        new google.maps.marker.AdvancedMarkerElement({
          position: markerPosition,
          map: map,
          gmpDraggable: true,
        });

      if (markerRef.current) {
        google.maps.event.addListener(markerRef.current, "dragend", (event: any) => {
          if (!event.latLng) return;
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          setMarkerPosition({ lat, lng });

          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK" && results && results[0]) {
              const address = results[0].formatted_address;
              setFormData((prev: any) => ({ ...prev, companyAddress: address }));

              if (addressInputRef.current) {
                addressInputRef.current.value = address;
              }
            } else {
              toast.error("Could not fetch address.");
            }
          });
        });
      }
    } else {
      markerRef.current.map = map;
    }
  }}
/>

  );
};

export default MapComponent;
