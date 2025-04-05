import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const Legend = () => {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', '');
      div.innerHTML = `
        <div style="
          background: white;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          font-size: 14px;
          font-family: 'Cairo', sans-serif;
          text-align: right;
        ">
          <div style="margin-bottom: 5px;">
            <span style="
              display: inline-block;
              width: 18px;
              height: 18px;
              background: green;
              margin-left: 8px;
              opacity: 0.7;
              float: right;
            "></span>
            آمن
          </div>
          <div>
            <span style="
              display: inline-block;
              width: 18px;
              height: 18px;
              background: red;
              margin-left: 8px;
              opacity: 0.7;
              float: right;
            "></span>
            صراع
          </div>
        </div>
      `;
      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
};

export default Legend;
