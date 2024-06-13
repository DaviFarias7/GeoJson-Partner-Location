import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMap,
} from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [partners, setPartners] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [selectedPartner, setSelectedPartner] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/partners/getAll',
        );
        console.log('Data received from API:', response.data);
        setPartners(response.data);
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    if (!searchId) return;

    try {
      const response = await axios.get(
        `http://localhost:8080/partners/${searchId}`,
      );
      console.log('Data received for ID:', response.data);
      setSelectedPartner(response.data);
    } catch (error) {
      console.error('Error fetching partner by ID:', error);
      setSelectedPartner(null);
    }
  };

  const SearchComponent = ({ partner }) => {
    const map = useMap();

    useEffect(() => {
      if (partner) {
        map.flyTo(
          [partner.address.coordinates[1], partner.address.coordinates[0]],
          15,
        );
      }
    }, [partner, map]);

    return null;
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter partner ID"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <MapContainer
        center={[-23.55, -46.64]}
        zoom={12}
        style={{ height: '80vh', width: '100%' }}
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
        {selectedPartner && <SearchComponent partner={selectedPartner} />}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
