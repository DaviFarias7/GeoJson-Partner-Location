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
import Select from 'react-select';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [partners, setPartners] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
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

  const handleSearchChange = async (selectedOption) => {
    setSearchValue(selectedOption);
    if (selectedOption) {
      try {
        const response = await axios.get(
          `http://localhost:8080/partners/${selectedOption.value}`,
        );
        console.log('Data received for ID:', response.data);
        setSelectedPartner(response.data);
      } catch (error) {
        console.error('Error fetching partner by ID:', error);
        setSelectedPartner(null);
      }
    } else {
      setSelectedPartner(null);
    }
  };

  const options = partners.map((partner) => ({
    value: partner.id,
    label: partner.tradingName,
  }));

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          marginTop: '20px',
          marginBottom: '20px',
          width: '80%',
          zIndex: 999,
        }}
      >
        <Select
          styles={{ zIndex: 999 }}
          value={searchValue}
          onChange={handleSearchChange}
          options={options}
          placeholder="Search for a partner..."
          isClearable
        />
      </div>
      <MapContainer
        center={[-23.55, -46.64]}
        zoom={3}
        style={{ height: '80vh', width: '80%' }}
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
