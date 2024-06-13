import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getPartners } from '../services/api';

const MapComponent = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPartners();
        console.log('Data received from API:', data); // Adicione este log
        setPartners(data);
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <MapContainer
      center={[-22.9, -43.2]}
      zoom={5}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {partners.map((pdv) => (
        <React.Fragment key={pdv.id}>
          <Marker
            position={[pdv.address.coordinates[1], pdv.address.coordinates[0]]}
          >
            <Popup>{pdv.tradingName}</Popup>
          </Marker>
          <GeoJSON data={pdv.coverageArea} />
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
