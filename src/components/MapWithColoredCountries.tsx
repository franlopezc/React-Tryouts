/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { MouseEvent, useState } from 'react';

export default function MapWithColoredCountries() {
  // URL del TopoJSON del mapa mundial
  const geoUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

  const BASE_COLOR = '#AEC6CF'; // Pastel blue
  const SELECTED_COLOR = '#FF6961'; // Pastel red (for example)

  // This state will store the name of the currently selected country (if any)

  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedCountry, setSelectedCountry] = useState('');

  // Handle mouse enter: update tooltip content and position
  const handleMouseEnter = (
    geo: any,
    evt: MouseEvent<SVGPathElement, MouseEvent>
  ) => {
    console.log(geo);
    const countryName = geo.properties.name || 'Unknown';
    setTooltipContent(countryName);
    // evt.clientX/Y gives the mouse position relative to the viewport
    setTooltipPosition({ x: evt.clientX, y: evt.clientY });
  };

  // Hide the tooltip on mouse leave
  const handleMouseLeave = () => {
    setTooltipContent('');
  };

  // Toggle selection on click
  const handleCountryClick = (geo: any) => {
    const countryName = geo.properties.name || 'Unknown';
    if (selectedCountry === countryName) {
      // Deselect if the same country is clicked again
      setSelectedCountry('');
    } else {
      // Select the clicked country
      setSelectedCountry(countryName);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh', // Igual que el otro componente
        maxWidth: '100%', // Para que no exceda el contenedor
        width: 'auto', // Permitir ajuste automático
        minWidth: 300, // Similar al `Box` de MUI
      }}
    >
      <ComposableMap
        projectionConfig={{ scale: 140 }} // Ajustar escala para mejor tamaño
        width={800} // Cambiar a un tamaño más responsivo
        height={250}
        style={{ width: '100%', height: '100%' }} // Ajuste total
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name;
              // If the country is selected, show a distinct color; otherwise use the scale
              const fillColor =
                selectedCountry === countryName ? SELECTED_COLOR : BASE_COLOR;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColor}
                  stroke="#FFF"
                  onMouseEnter={(evt: any) => handleMouseEnter(geo, evt)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleCountryClick(geo)}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#F53', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      {tooltipContent && (
        <div
          style={{
            position: 'absolute',
            top: tooltipPosition.y + 10,
            left: tooltipPosition.x + 10,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            color: '#FFF',
            padding: '5px 10px',
            borderRadius: '4px',
            pointerEvents: 'none',
            fontSize: '0.8em',
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
}
