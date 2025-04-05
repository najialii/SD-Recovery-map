import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafeltMap = () => {
  const [sudanStatesGeoJSON, setSudanStatesGeoJSON] = useState(null);
  const [stateStatus, setStateStatus] = useState(null);
  const [sdCities, setSdCities]= useState(null)
const [citiyBoundaries, setCitiyBoundaries] = useState(null)
  useEffect(() => {
    fetch('/sd.json')
      .then(response => response.json())
      .then(data => setSudanStatesGeoJSON(data))
      .catch(error => console.error("Error fetching GeoJSON:", error));
  }, []);

  useEffect(() => {
    fetch('/stateStatus.json')
      .then(response => response.json())
      .then(data => {
        const statusMap = {};
        data.features.forEach(feature => {
          const stateName = feature.properties.state;
          statusMap[stateName] = feature;
        });
        setStateStatus(statusMap);
      })
      .catch(error => console.error("Error fetching state status:", error));
  }, []);

  useEffect(() => {
    fetch('/sdCities.json')
      .then(response => response.json())
      .then(data => setSdCities(data))
      .catch(error => console.error("Error fetching GeoJSON:", error));
  }, []);

  useEffect(()=>{console.log(sdCities)},[sdCities])


  const geoJSONStyle = (feature) => {
    const stateName = feature.properties?.name || '';
    const status = stateStatus?.[stateName]?.properties?.status || 'peaceful';
    const hasElec = stateStatus?.[stateName]?.properties?.services?.electricity === 'available';
const cities = sdCities?.lng 
console.log(cities)
    // console.log(hasElec)

    return {
      color: status === 'conflict' ? '#9f0712' : '#016630',
      fillColor: status === 'conflict' ? '#fb2c36' : '#00c950',
      fillOpacity: 0.4,
      weight: 2,
      className: hasElec ? 'electric-glow' : '',

    };
  };

  const createCustomIcon = (status, hasElectricity) => {
    const color = status === 'conflict' ? 'red' : hasElectricity ? '#00ffcc' : 'green';
    return L.divIcon({
      className: 'custom-icon',
      html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; box-shadow: ${
        hasElectricity ? '0 0 8px #00ffee' : 'none'
      };"></div>`,
    });
  };
  





  
  return (




<div>







    <div className='grid grid-cols-3'>






<div className='col-span-2'>

      <MapContainer center={[15.5007, 32.5599]} zoom={6} style={{ height: '600px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* <TileLayer
    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
  /> */}
        {sudanStatesGeoJSON && <GeoJSON data={sudanStatesGeoJSON} style={geoJSONStyle} />}

        {stateStatus &&
          Object.values(stateStatus).map((state, index) => {
            const { state: stateName, status, services } = state.properties;
            const coordinates = state.geometry.coordinates;


            
            if (!coordinates || coordinates.length !== 2) return null;

            const [lng, lat] = coordinates;

            return (
              <Marker key={index} position={[lat, lng]} icon={createCustomIcon(status === 'conflict' ? 'red' : 'green')}>
              <Popup>
  <div className="space-y-1">
    <h2 className="font-bold text-lg">{stateName}</h2>
    <p><strong>الحالة:</strong> {status === 'conflict' ? 'صراع' : 'آمنة'}</p>
    <ul className="list-disc ml-4">
      <li>كهرباء: {services?.electricity || 'N/A'}</li>
      <li>مستشفيات: {services?.hospitals || 'N/A'}</li>
      <li>مياه: {services?.water || 'N/A'}</li>
      <li>اتصال: {services?.network || 'N/A'}</li>
    </ul>
  </div>
</Popup>

              </Marker>
            );
          })}


          {sdCities &&
          sdCities.map((city, index) => (
            <Circle
              key={index}
              center={[parseFloat(city.lat), parseFloat(city.lng)]}
              radius={5000} 
              pathOptions={{
                color: 'blue', 
                fillColor: 'lightblue', 
                fillOpacity: 0.2,
              }}
            >
              <Popup>
                <strong>{city.city}</strong><br />
                State: {city.admin_name}<br />
                Population: {city.population || 'N/A'}
              </Popup>
            </Circle>
          ))}
      </MapContainer>
      </div>
      <div dir="rtl" className="font-cairo text-right p-4 bg-white rounded-lg shadow-md space-y-4">
  <h2 className="text-3xl font-bold text-[#027384] ">خريطة الأمل </h2>
  <p className="text-gray-700 leading-relaxed">
    تهدف هذه الخريطة إلى تسليط الضوء على المناطق التي بدأت تستعيد عافيتها في مختلف أنحاء البلاد.
    يمكنكم من خلال الخريطة تتبّع المناطق التي شهدت تحسّنًا في الأوضاع الأمنية وعودة الخدمات الأساسية مثل الكهرباء، المياه، والاتصال.
  </p>
  <p className="text-gray-700 leading-relaxed">
    نأمل أن تسهم هذه الخريطة في نشر الأمل، وتعزيز جهود العودة والاستقرار في ربوع الوطن.
  </p>
</div>


    </div>
    </div>
  );
};

export default LeafeltMap;
