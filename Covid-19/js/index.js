/* eslint-disable no-undef */
import '../sass/style.scss';
import './images';
import create from './utils/create';
import addSpaceToNumbers from './utils/addSpaceToNumbers';
import roundTwoDecimal from './utils/roundTwoDecimal';
import Keyboard from './keyboard';
import createData from './utils/getData';

Keyboard.init();
createData();

const inputCountry = document.querySelector('.use-keyboard-input');
const countryList = document.querySelector('#countries');
const enterBtn = document.querySelector('.keyboard__key_enter');
const url = 'https://api.covid19api.com/summary';
// const url2 = 'https://api.covid19api.com/dayone/country/south-africa/status/confirmed';
const urlTotalDaily = 'https://disease.sh/v3/covid-19/historical/all?lastdays=366';
const urlPopulation = 'https://restcountries.eu/rest/v2/all?fields=name;population;flag';
const tableCountry = document.querySelector('.table-country');
const tableCases = document.querySelector('.table-cases');
const tableRecovery = document.querySelector('.table-recovery');
const tableDead = document.querySelector('.table-dead');
const listHeading = document.querySelector('.list__heading');
const listMain = document.querySelector('.list__main');
const tabs = document.querySelectorAll('.tab');
const fullScreenBtns = document.querySelectorAll('.fullscreen__btn');

const populationGlobal = 7827000000;
let activeTabList = 'Cases';
let activeTabChart = 'Cases';
let activeTabMap = 'Cases';
const populationOfCountiesNotInAPI = {
  Bolivia: 11639909,
  'Cape Verde': 543767,
  'Congo (Brazzaville)': 1408150,
  'Congo (Kinshasa)': 11575000,
  'Holy See (Vatican City State)': 825,
  'Iran, Islamic Republic of': 78408412,
  'Korea (South)': 51732586,
  'Lao PDR': 7123205,
  'Macao, SAR China': 653100,
  'Macedonia, Republic of': 2077132,
  'Palestinian Territory': 4543126,
  'Saint Vincent and Grenadines': 110210,
  'Syrian Arab Republic (Syria)': 17500657,
  'Taiwan, Republic of China': 23568378,
  'United Kingdom': 66273576,
  'Venezuela (Bolivarian Republic)': 28887118,
  Moldova: 3550900,
};

const appState = {
  global: true,
  country: null,
  period: true,
  population: true,
};

function sortData(data, population) {
  let key;
  if (activeTab === 'Cases' && appState.period) {
    key = 'TotalConfirmed';
  } else if (activeTab === 'Cases' && !appState.period) {
    key = 'NewConfirmed';
  } else if (activeTab === 'Recovered' && appState.period) {
    key = 'TotalRecovered';
  } else if (activeTab === 'Recovered' && !appState.period) {
    key = 'NewRecovered';
  } else if (activeTab === 'Deaths' && appState.period) {
    key = 'TotalDeaths';
  } else {
    key = 'NewDeaths';
  }
  let coefPer100kListA;
  let coefPer100kListB;
  if (!appState.population) {
    data.sort((a, b) => {
      const popA = population.filter((c) => c.name === a.Country)[0];
      const popB = population.filter((c) => c.name === b.Country)[0];
      if (popA) coefPer100kListA = popA.population / 100000;
      if (populationOfCountiesNotInAPI[a.Country]) {
        coefPer100kListA = populationOfCountiesNotInAPI[a.Country] / 100000;
      }
      if (popB) coefPer100kListB = popB.population / 100000;
      if (populationOfCountiesNotInAPI[b.Country]) {
        coefPer100kListB = populationOfCountiesNotInAPI[b.Country] / 100000;
      }
      return a[key] / coefPer100kListA > b[key] / coefPer100kListB ? 1 : -1;
    });
  } else {
    data.sort((a, b) => (a[key] > b[key] ? 1 : -1));
  }
  if (listHeading.classList.contains('reverse')) {
    data.reverse();
  }
  return data;
}

async function renderTable() {
  const response = await fetch(url);
  const data = await response.json();
  const responsePopulation = await fetch(urlPopulation);
  const dataPopulation = await responsePopulation.json();
  if (appState.global) {
    const coefPer100k = populationGlobal / 100000;
    tableCountry.innerHTML = 'GLOBAL';
    if (appState.population && appState.period) {
      tableCases.innerHTML = addSpaceToNumbers(data.Global.TotalConfirmed);
      tableRecovery.innerHTML = addSpaceToNumbers(data.Global.TotalRecovered);
      tableDead.innerHTML = addSpaceToNumbers(data.Global.TotalDeaths);
    } else if (appState.population && !appState.period) {
      tableCases.innerHTML = addSpaceToNumbers(data.Global.NewConfirmed);
      tableRecovery.innerHTML = addSpaceToNumbers(data.Global.NewRecovered);
      tableDead.innerHTML = addSpaceToNumbers(data.Global.NewDeaths);
    } else if (!appState.population && appState.period) {
      tableCases.innerHTML = roundTwoDecimal(data.Global.TotalConfirmed / coefPer100k);
      tableRecovery.innerHTML = roundTwoDecimal(data.Global.TotalRecovered / coefPer100k);
      tableDead.innerHTML = roundTwoDecimal(data.Global.TotalDeaths / coefPer100k);
    } else {
      tableCases.innerHTML = roundTwoDecimal(data.Global.NewConfirmed / coefPer100k);
      tableRecovery.innerHTML = roundTwoDecimal(data.Global.NewRecovered / coefPer100k);
      tableDead.innerHTML = roundTwoDecimal(data.Global.NewDeaths / coefPer100k);
    }
  } else {
    const targetCountry = data.Countries.filter((item) => item.Country === appState.country)[0];
    const targetPopulation = dataPopulation.filter((elem) => elem.name === appState.country)[0];
    const coefPer100k = targetPopulation.population / 100000;
    tableCountry.innerHTML = `<img src=${targetPopulation.flag} class="flag"></img><span>${targetCountry.Country}</span>`;
    if (appState.population && appState.period) {
      tableCases.innerHTML = addSpaceToNumbers(targetCountry.TotalConfirmed);
      tableRecovery.innerHTML = addSpaceToNumbers(targetCountry.TotalRecovered);
      tableDead.innerHTML = addSpaceToNumbers(targetCountry.TotalDeaths);
    } else if (appState.population && !appState.period) {
      tableCases.innerHTML = addSpaceToNumbers(targetCountry.NewConfirmed);
      tableRecovery.innerHTML = addSpaceToNumbers(targetCountry.NewRecovered);
      tableDead.innerHTML = addSpaceToNumbers(targetCountry.NewDeaths);
    } else if (!appState.population && appState.period) {
      tableCases.innerHTML = addSpaceToNumbers(
        roundTwoDecimal(targetCountry.TotalConfirmed / coefPer100k),
      );
      tableRecovery.innerHTML = addSpaceToNumbers(
        roundTwoDecimal(targetCountry.TotalRecovered / coefPer100k),
      );
      tableDead.innerHTML = addSpaceToNumbers(
        roundTwoDecimal(targetCountry.TotalDeaths / coefPer100k),
      );
    } else {
      tableCases.innerHTML = addSpaceToNumbers(
        roundTwoDecimal(targetCountry.NewConfirmed / coefPer100k),
      );
      tableRecovery.innerHTML = addSpaceToNumbers(
        roundTwoDecimal(targetCountry.NewRecovered / coefPer100k),
      );
      tableDead.innerHTML = addSpaceToNumbers(
        roundTwoDecimal(targetCountry.NewDeaths / coefPer100k),
      );
    }
  }
}

async function setDataList() {
  const responseList = await fetch(url);
  const dataList = await responseList.json();
  const countries = dataList.Countries;
  create('option', '', '', countryList, ['value', 'Global']);
  countries.forEach((el) => {
    create('option', '', '', countryList, ['value', `${el.Country}`]);
  });
}

async function renderList() {
  listMain.innerHTML = '';
  const responseList = await fetch(url);
  const dataList = await responseList.json();
  let countries = dataList.Countries;
  const responsePopulationList = await fetch(urlPopulation);
  const dataPopulationList = await responsePopulationList.json();
  listHeading.innerHTML = activeTabList;
  if (listHeading.classList.contains('active-sort')) {
    countries = sortData(countries, dataPopulationList);
  }
  countries.forEach((elem) => {
    const targetPopulationList = dataPopulationList.filter((c) => c.name === elem.Country)[0];
    let coefPer100kList;
    if (targetPopulationList) coefPer100kList = targetPopulationList.population / 100000;
    if (populationOfCountiesNotInAPI[elem.Country]) {
      coefPer100kList = populationOfCountiesNotInAPI[elem.Country] / 100000;
    }
    const divCountry = document.createElement('div');
    const numEl = document.createElement('span');
    const countryEl = document.createElement('span');
    const flagEl = document.createElement('img');
    divCountry.classList.add('country-list-line');
    let targetCategory;
    if (activeTabList === 'Cases' && appState.period) {
      targetCategory = elem.TotalConfirmed;
    } else if (activeTabList === 'Cases' && !appState.period) {
      targetCategory = elem.NewConfirmed;
    } else if (activeTabList === 'Recovered' && appState.period) {
      targetCategory = elem.TotalRecovered;
    } else if (activeTabList === 'Recovered' && !appState.period) {
      targetCategory = elem.NewRecovered;
    } else if (activeTabList === 'Deaths' && appState.period) {
      targetCategory = elem.TotalDeaths;
    } else {
      targetCategory = elem.NewDeaths;
    }
    if (!appState.population) {
      targetCategory = roundTwoDecimal(targetCategory / coefPer100kList);
    }
    numEl.innerHTML = addSpaceToNumbers(targetCategory);
    numEl.classList.add('num-list');
    countryEl.innerHTML = elem.Country;
    countryEl.classList.add('country-list');
    if (targetPopulationList) {
      flagEl.src = targetPopulationList.flag;
    }
    flagEl.classList.add('flag');
    divCountry.append(numEl, countryEl, flagEl);
    listMain.append(divCountry);
  });
}

async function renderChart() {
  document.querySelector('.canvas-wrapper').innerHtml = '';
  if (document.querySelector('#myChart')) {
    document.querySelector('#myChart').remove();
  }
  const canvasEl = document.createElement('canvas');
  canvasEl.setAttribute('id', 'myChart');
  canvasEl.setAttribute('width', '300');
  canvasEl.setAttribute('height', '180');
  document.querySelector('.canvas-wrapper').append(canvasEl);
  const ctx = document.getElementById('myChart').getContext('2d');
  let responseChart;
  if (appState.global) {
    responseChart = await fetch(urlTotalDaily);
  } else {
    let targetCountry;
    if (appState.country.indexOf(' ') > -1) {
      targetCountry = appState.country
        .split(' ')
        .map((word) => word[0].toLowerCase() + word.slice(1))
        .join('-');
    } else {
      targetCountry = appState.country[0].toLowerCase() + appState.country.slice(1);
    }
    if (activeTabChart === 'Cases') {
      responseChart = await fetch(
        `https://api.covid19api.com/dayone/country/${targetCountry}/status/confirmed`,
      );
    } else if (activeTabChart === 'Recovered') {
      responseChart = await fetch(
        `https://api.covid19api.com/dayone/country/${targetCountry}/status/recovered`,
      );
    } else {
      responseChart = await fetch(
        `https://api.covid19api.com/dayone/country/${targetCountry}/status/deaths`,
      );
    }
  }
  const dataChart = await responseChart.json();
  let dataNum = [];
  let typeChart;
  let labelsNames = [];
  if (appState.global) {
    if (activeTabChart === 'Cases') {
      dataNum = Object.values(dataChart.cases);
      labelsNames = Object.keys(dataChart.cases);
    } else if (activeTabChart === 'Recovered') {
      dataNum = Object.values(dataChart.recovered);
      labelsNames = Object.keys(dataChart.recovered);
    } else {
      dataNum = Object.values(dataChart.deaths);
      labelsNames = Object.keys(dataChart.deaths);
    }
  } else {
    dataChart.forEach((day) => dataNum.push(day.Cases));
    labelsNames = dataChart.map((day) => day.Date.slice(0, 10));
  }

  if (appState.period) {
    typeChart = 'line';
  } else {
    typeChart = 'bar';
    dataNum = dataNum.map((el, index, array) => {
      if (index > 0) {
        if (array[index] - array[index - 1] > 0) {
          return array[index] - array[index - 1];
        }
        return 0;
      }
      return el;
    });
  }
  const responsePopulation = await fetch(urlPopulation);
  const dataPopulation = await responsePopulation.json();
  if (!appState.population) {
    let coefPer100kChart;
    if (appState.global) {
      coefPer100kChart = populationGlobal / 100000;
    } else {
      const targetPopulation = dataPopulation.filter((elem) => elem.name === appState.country)[0];
      if (targetPopulation) coefPer100kChart = targetPopulation.population / 100000;
      if (populationOfCountiesNotInAPI[appState.country]) {
        coefPer100kChart = populationOfCountiesNotInAPI[appState.country] / 100000;
      }
    }
    dataNum = dataNum.map((number) => roundTwoDecimal(number / coefPer100kChart));
  }
  // eslint-disable-next-line no-unused-vars
  const myChart = new Chart(ctx, {
    type: typeChart,
    data: {
      labels: labelsNames,
      datasets: [
        {
          label: activeTabChart,
          data: dataNum,
          backgroundColor: 'rgba(255, 206, 86, 0.8)',
          borderColor: 'rgba(255, 206, 86, 0.2)',
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: (value) => {
                if (value > 999999) {
                  return `${value / 10e5}M`;
                }
                if (value > 9999) {
                  return `${value / 10e2}k`;
                }
                return value;
              },
            },
          },
        ],
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'month',
            },
          },
        ],
      },
    },
  });
}

async function renderMap() {
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
    'https://api.mapbox.com/styles/v1/jesperchrisper/ckixkl6335ux819sz1p9iqzj0/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVzcGVyY2hyaXNwZXIiLCJhIjoiY2tpeGtnemppMTQ1dDMwbWVsYzh2c2pyZiJ9.fxYLezkdWZXl2qrgjLR5vw'; //! Custom Map
  const openStreetMap = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const layer = new L.TileLayer(mapbox || openStreetMap);
  map.addLayer(layer);

  geoData.features.forEach((el) => {
    const peer100k = (value) => {
      return Math.floor((value / el.properties.population) * 100000);
    };
    const iconOptions = {};
    let count = 0;
    let markerDesctription = '';
    if (activeTabMap === 'Cases') {
      if (!appState.period && !appState.population) {
        count = peer100k(el.properties.todayCases);
        markerDesctription = 'Peer 100k & Last Day';
      } else if (!appState.population) {
        count = el.properties.casesPerOneMillion * 10;
        markerDesctription = 'Peer 100k';
      } else if (!appState.period) {
        count = el.properties.todayCases;
        markerDesctription = 'Last Day';
      } else {
        count = el.properties.cases;
      }

      if (count > 2000000) {
        iconOptions.iconUrl = '../assets/static/covid-19-red.png';
        iconOptions.iconSize = [35, 35];
      } else {
        iconOptions.iconUrl = '../assets/static/covid-19.png';
        iconOptions.iconSize = [22, 22];
      }
    } else if (activeTabMap === 'Recovered') {
      iconOptions.iconUrl = '../assets/static/recovered.png';

      if (!appState.period && !appState.population) {
        count = peer100k(el.properties.todayRecovered);
        markerDesctription = 'Peer 100k & Last Day';
      } else if (!appState.population) {
        count = el.properties.recoveredPerOneMillion * 10;
        markerDesctription = 'Peer 100k';
      } else if (!appState.period) {
        count = el.properties.todayRecovered;
        markerDesctription = 'Last Day';
      } else {
        count = el.properties.recovered;
      }

      if (count > 1000000) {
        iconOptions.iconSize = [35, 35];
      } else {
        iconOptions.iconSize = [22, 22];
      }
    } else {
      iconOptions.iconUrl = '../assets/static/death.png';

      if (!appState.period && !appState.population) {
        count = peer100k(el.properties.todayDeaths);
        markerDesctription = 'Peer 100k & Last Day';
      } else if (!appState.population) {
        count = el.properties.deathsPerOneMillion * 10;
        markerDesctription = 'Peer 100k';
      } else if (!appState.period) {
        count = el.properties.todayDeaths;
        markerDesctription = 'Last Day';
      } else {
        count = el.properties.deaths;
      }

      if (count > 100000) {
        iconOptions.iconSize = [35, 35];
      } else {
        iconOptions.iconSize = [22, 22];
      }
    }

    const customIcon = L.icon(iconOptions);

    const markerOptions = {
      title: `${markerDesctription} ${activeTabChart} ${el.properties.country}`,
      clickable: true,
      draggable: false,
      icon: customIcon,
    };

    const marker = L.marker(el.coordinates, markerOptions);
    const markerTemplate = `<p>${markerDesctription} ${activeTabMap}: ${addSpaceToNumbers(
      count,
    )}<p>`;
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

      renderTable();
      renderChart();
    });
  });

  const legend = L.control({ position: 'bottomleft' });
  legend.onAdd = () => {
    const div = create('div', 'info legend');
    if (activeTabMap === 'Cases') {
      create(
        'i',
        'legend__line',
        [create('i', 'cases', ''), create('i', 'legend__title', 'Cases > 2 000 000')],
        div,
      );
      create(
        'i',
        'legend__line',
        [create('i', 'cases-small', ''), create('i', 'legend__title', 'Cases < 2 000 000')],
        div,
      );
    } else if (activeTabMap === 'Recovered') {
      create(
        'i',
        'legend__line',
        [create('i', 'recovered', ''), create('i', 'legend__title', 'Recovered > 1 000 000')],
        div,
      );
      create(
        'i',
        'legend__line',
        [
          create('i', 'recovered recovered-small', ''),
          create('i', 'legend__title', 'Recovered < 1 000 000'),
        ],
        div,
      );
    } else {
      create(
        'i',
        'legend__line',
        [create('i', 'death', ''), create('i', 'legend__title', 'Death > 100 000')],
        div,
      );
      create(
        'i',
        'legend__line',
        [create('i', 'death death-small', ''), create('i', 'legend__title', 'Death < 100 000')],
        div,
      );
    }

    return div;
  };
  legend.addTo(map);
}

function deleteSortList() {
  if (listHeading.classList.contains('active-sort')) {
    listHeading.classList.remove('active-sort');
  }
  if (listHeading.classList.contains('reverse')) {
    listHeading.classList.remove('reverse');
  }
}

function defineActiveTab(e) {
  let tabBtns;
  if (e.target.parentNode.classList.contains('tab_list')) {
    tabBtns = document.querySelectorAll('.tab_list span');
    tabBtns.forEach((tabBtn) => {
      if (tabBtn === e.target) {
        if (!tabBtn.classList.contains('active')) {
          tabBtn.classList.add('active');
          activeTabList = tabBtn.innerText;
        }
      } else {
        tabBtn.classList.remove('active');
      }
    });
    deleteSortList();
    renderList();
  } else if (e.target.parentNode.classList.contains('tab_chart')) {
    tabBtns = document.querySelectorAll('.tab_chart span');
    tabBtns.forEach((tabBtn) => {
      if (tabBtn === e.target) {
        if (!tabBtn.classList.contains('active')) {
          tabBtn.classList.add('active');
          activeTabChart = tabBtn.innerText;
        }
      } else {
        tabBtn.classList.remove('active');
      }
    });
    renderChart();
  } else if (e.target.parentNode.classList.contains('tab_map')) {
    tabBtns = document.querySelectorAll('.tab_map span');
    tabBtns.forEach((tabBtn) => {
      if (tabBtn === e.target) {
        if (!tabBtn.classList.contains('active')) {
          tabBtn.classList.add('active');
          activeTabMap = tabBtn.innerText;
        }
      } else {
        tabBtn.classList.remove('active');
      }
    });
    renderMap();
  }
}

function sortList() {
  if (listHeading.classList.contains('active-sort')) {
    listHeading.classList.toggle('reverse');
  } else {
    listHeading.classList.add('active-sort');
  }
  renderList();
}

function updateState(e) {
  if (e.target.classList.contains('period')) {
    appState.period = !appState.period;
    document.querySelectorAll('.period').forEach((switcher) => {
      if (switcher !== e.target) {
        // eslint-disable-next-line no-param-reassign
        switcher.checked = !switcher.checked;
      }
    });
  }
  if (e.target.classList.contains('population')) {
    appState.population = !appState.population;
    document.querySelectorAll('.population').forEach((switcher) => {
      if (switcher !== e.target) {
        // eslint-disable-next-line no-param-reassign
        switcher.checked = !switcher.checked;
      }
    });
  }
  renderTable();
  renderList();
  renderChart();
  renderMap();
}

function setCountryFromList(e) {
  appState.global = false;
  appState.country = e.target.closest('div').children[1].innerText;
  renderTable();
  renderChart();
}

function makeFullscreen(e) {
  e.target.parentNode.parentNode.classList.toggle('fullscreen-active');
}

const enterCity = () => {
  if (inputCountry.value === 'Global') {
    appState.global = true;
    appState.country = null;
  } else {
    appState.global = false;
    appState.country = inputCountry.value.toString();
    appState.country = `${appState.country[0].toUpperCase()}${appState.country.slice(1)}`;
  }
  renderTable();
  renderChart();
  inputCountry.value = '';
};

inputCountry.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    enterCity();
    if (!document.querySelector('.keyboard').classList.contains('keyboard--hidden')) {
      document.querySelector('.keyboard').classList.add('keyboard--hidden');
    }
  }
});

enterBtn.addEventListener('click', () => {
  enterCity();
});

document.querySelectorAll('.switch-checkbox').forEach((block) => {
  block.addEventListener('click', (e) => updateState(e));
});

tabs.forEach((tab) => tab.addEventListener('click', (e) => defineActiveTab(e)));
listHeading.addEventListener('click', () => sortList());
listMain.addEventListener('click', (e) => setCountryFromList(e));
fullScreenBtns.forEach((btn) => btn.addEventListener('click', (e) => makeFullscreen(e)));

renderMap();
renderTable();
renderList();
renderChart();
setDataList();
