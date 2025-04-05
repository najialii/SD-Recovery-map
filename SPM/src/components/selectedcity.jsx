import React from 'react';

const CitySelect = ({ onSelectCity }) => {
  return (
    <div>
      <label htmlFor="citySelect">Select a City: </label>
      <select id="citySelect" onChange={(e) => onSelectCity(e.target.value)}>
        <option value="">--Select City--</option>
        <option value="Khartoum">Khartoum</option>
        <option value="Darfur">Darfur</option>
        {/* Add more cities as needed */}
      </select>
    </div>
  );
};

export default CitySelect;
