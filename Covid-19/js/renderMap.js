/* eslint-disable no-undef */
import create from './utils/create';
import addSpaceToNumbers from './utils/addSpaceToNumbers';

export default async function renderMap(state, tabMap) {
  const appState = state;
  const activeTabMap = tabMap;
  document.querySelector('#map').innerHTML = '';
  if (document.querySelector('#map')) {
    document.querySelector('#map').remove();
  }
  create('div', '', '', document.querySelector('.map__container'), ['id', 'map']);
  let response;
  try {
    response = await fetch('https://corona.lmao.ninja/v2/countries');
  } catch (e) {
    return;
  }
  const data = await response.json();
  if (!Array.isArray(data) && !data.length > 0) return;
  const geoData = {
    type: 'FeatureCollection',
    features: data.map((country = {}) => {
      const { countryInfo = {} } = country;
      const { lat, long: lng } = countryInfo;
      return {
        properties: {
          ...country,
        },
        coordinates: [lat, lng],
      };
    }),
  };

  const mapOptions = {
    center: [53, 27],
    zoom: 2,
    minZoom: 2,
    maxZoom: 5,
  };

  const map = new L.Map('map', mapOptions);

  const mapbox =
    'https://api.mapbox.com/styles/v1/jesperchrisper/ckixkl6335ux819sz1p9iqzj0.html?fresh=true&title=copy&access_token=pk.eyJ1IjoiamVzcGVyY2hyaXNwZXIiLCJhIjoiY2tpeGtnemppMTQ1dDMwbWVsYzh2c2pyZiJ9.fxYLezkdWZXl2qrgjLR5vw'; //! Custom Map
  const openStreetMap = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const layer = new L.TileLayer(openStreetMap || mapbox);
  map.addLayer(layer);

  geoData.features.forEach((el) => {
    const iconOptions = {};
    let count = 0;
    if (activeTabMap === 'Cases') {
      count = el.properties.cases;
      if (el.properties.cases > 2000000) {
        iconOptions.iconUrl = '../assets/static/covid-19-red.png';
        iconOptions.iconSize = [35, 35];
      } else {
        iconOptions.iconUrl = '../assets/static/covid-19.png';
        iconOptions.iconSize = [22, 22];
      }
    } else if (activeTabMap === 'Recovered') {
      count = el.properties.recovered;
      iconOptions.iconUrl = '../assets/static/recovered.png';
      if (el.properties.recovered > 1000000) {
        iconOptions.iconSize = [35, 35];
      } else {
        iconOptions.iconSize = [22, 22];
      }
      count = el.properties.recovered;
    } else {
      count = el.properties.deaths;
      iconOptions.iconUrl = '../assets/static/death.png';
      if (el.properties.deaths > 100000) {
        iconOptions.iconSize = [35, 35];
      } else {
        iconOptions.iconSize = [22, 22];
      }
    }

    const customIcon = L.icon(iconOptions);

    const markerOptions = {
      title: `${activeTabMap} ${el.properties.country}`,
      clickable: true,
      draggable: false,
      icon: customIcon,
    };

    const marker = L.marker(el.coordinates, markerOptions);
    const markerTemplate = `<p>${activeTabMap}: ${addSpaceToNumbers(count)}<p>`;
    marker.bindPopup(`${markerTemplate}`).openPopup();
    marker.addTo(map);
    marker.addEventListener('click', () => {
      appState.global = false;
      appState.country = `${el.properties.country}`;

      switch (el.properties.country) {
        case 'USA':
          appState.country = 'United States of America';
          break;
        case 'UK':
          appState.country = 'United Kingdom';
          break;
        case 'Russia':
          appState.country = 'Russian Federation';
          break;
        default:
          break;
      }

      // renderTable();
      // renderChart();
    });
  });
}
