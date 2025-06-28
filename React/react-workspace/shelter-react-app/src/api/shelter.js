import { API } from './common';

// 무더위쉼터
export const fetchHeatShelters = async () => {
  const res = await API.get('/shelters/heat');
  return res.data.map(d => ({ ...d, type: 'HEAT' }));
};

// 한파쉼터
export const fetchColdShelters = async () => {
  const res = await API.get('/shelters/cold');
  return res.data.map(d => ({ ...d, type: 'COLD' }));
};

// 화학대피소
export const fetchChemicalShelters = async () => {
  const res = await API.get('/shelters/chemical');
  return res.data.map(d => ({ ...d, type: 'CHEMICAL' }));
};

// 민방위대피소
export const fetchCivilDefenseShelters = async () => {
  const res = await API.get('/shelters/defense');
  return res.data.map(d => ({ ...d, type: 'CIVIL' }));
};

// 지진/해일대피소
export const fetchEarthquakeShelters = async () => {
  const res = await API.get('/shelters/earthquake');
  return res.data.map(d => ({ ...d, type: 'EARTHQUAKE' }));
};
