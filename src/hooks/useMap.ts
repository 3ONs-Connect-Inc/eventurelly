import { useState, useRef, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { toast } from "react-toastify";

const libraries: ("places" | "marker")[] = ["places", "marker"];

export const useMap = (initialCenter: { lat: number; lng: number }, setFormData: any) => {
  const [markerPosition, setMarkerPosition] = useState(initialCenter);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const addressInputRef = useRef<HTMLInputElement | null>(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  useEffect(() => {
    if (addressInputRef.current && isLoaded) {
      autocompleteRef.current = new google.maps.places.Autocomplete(addressInputRef.current, {
        types: ["geocode"],
      });
  
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const address = place.formatted_address || "Address not found";
          
          setMarkerPosition({ lat, lng }); 
          setFormData((prev: any) => ({ ...prev, companyAddress: address }));
          
          if (mapRef.current) {
            mapRef.current.setCenter({ lat, lng });
          }
  
          if (markerRef.current) {
            markerRef.current.position = { lat, lng }; 
          }
        } else {
          console.log("Invalid address selected.");
        }
      });
    }
  }, [isLoaded, setFormData]);
  

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const address = results[0].formatted_address;
        setFormData((prev: any) => ({ ...prev, companyAddress: address }));
      } else {
        toast.error("Could not fetch address.");
      }
    });
    toast.info("Location updated!");
  };

  useEffect(() => {
    if (!isLoaded || !google.maps.marker || !mapRef.current) return;
  
    if (!markerRef.current) {
      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        position: markerPosition,
        map: mapRef.current,
        gmpDraggable: true,
      });
  
      // Add event listener for drag end
      markerRef.current.addListener("dragend", (event: any) => {
        if (!event.latLng) return;
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setMarkerPosition({ lat, lng });
  
        // Reverse geocoding to get the address
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const address = results[0].formatted_address;
  
            // Update formData and input field
            setFormData((prev: any) => ({ ...prev, companyAddress: address }));
  
            if (addressInputRef.current) {
              addressInputRef.current.value = address;
            }
          } else {
            toast.error("Could not fetch address.");
          }
        });
      });
    } else {
      markerRef.current.position = markerPosition;
    }
  }, [markerPosition, isLoaded, setFormData]);
  


  return {  isLoaded, loadError, setMarkerPosition, markerRef, handleMapClick, mapRef, markerPosition, addressInputRef };
};