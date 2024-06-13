import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const MapComponent = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/partners/getAll',
        );
        setPartners(response.data);
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <MapContainer
      center={[-23.55, -46.64]}
      zoom={12}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {partners.map((partner) => (
        <React.Fragment key={partner.id}>
          <Marker
            position={[
              partner.address.coordinates[1],
              partner.address.coordinates[0],
            ]}
          >
            <Popup>{partner.tradingName}</Popup>
          </Marker>
          <GeoJSON
            data={partner.coverageArea}
            style={{
              fillColor: 'blue',
              fillOpacity: 0.2,
              color: 'blue',
              weight: 2,
            }}
          />
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
