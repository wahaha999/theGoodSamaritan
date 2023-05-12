import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Autocomplete from 'react-google-places-autocomplete';
import { Button, Dialog } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Controller, useFormContext } from 'react-hook-form';
const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function MapContainer() {
  const [mapCenter, setMapCenter] = useState(center);
  const {control}=useFormContext()
const [open,setOpen] = useState(false)
  const handleSelect = ({ value }) => {
    setMapCenter({
      lat: value.geometry.location.lat(),
      lng: value.geometry.location.lng()
    });
  };

  return (
    <div>
      <Button startIcon={<AddLocationIcon />} onClick={() => setOpen(true)}>Add Location</Button>
        <Controller
          name="address"
          defaultValue={{ lat: 10.99835602, lng: 77.01502627 }}
          control={control}
          render={({ field}) => (
            <>
            <Dialog onClose={() => setOpen(false)} open={open} fullWidth maxWidth="sm" sx={{ padding: '20px' }}>
              <Autocomplete onSelect={handleSelect} apiKey="YOUR_GOOGLE_MAPS_API_KEY" />
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={mapCenter}
                  zoom={10}
                >
                  <Marker position={mapCenter} />
                </GoogleMap>
              </LoadScript>
            </Dialog>
            </>
          )}
        />
    </div>
  );
}

export default MapContainer;
