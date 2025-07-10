import { API } from './common';

export const fetchHeatShelters = async () => {
  try {
    const res = await API.get('/shelters/heat');
    return res.data.map(d => ({ ...d, type: 'HEAT' }));
  } catch (err) {
    throw err.response?.data?.message || err.message || '무더위쉼터 조회 실패';
  }
};

export const fetchColdShelters = async () => {
  try {
    const res = await API.get('/shelters/cold');
    return res.data.map(d => ({ ...d, type: 'COLD' }));
  } catch (err) {
    throw err.response?.data?.message || err.message || '한파쉼터 조회 실패';
  }
};

export const fetchChemicalShelters = async () => {
  try {
    const res = await API.get('/shelters/chemical');
    return res.data.map(d => ({ ...d, type: 'CHEMICAL' }));
  } catch (err) {
    throw err.response?.data?.message || err.message || '화학대피소 조회 실패';
  }
};

export const fetchCivilDefenseShelters = async () => {
  try {
    const res = await API.get('/shelters/defense');
    return res.data.map(d => ({ ...d, type: 'CIVIL_DEFENSE' }));
  } catch (err) {
    throw err.response?.data?.message || err.message || '민방위대피소 조회 실패';
  }
};

export const fetchEarthquakeShelters = async () => {
  try {
    const res = await API.get('/shelters/earthquake');
    return res.data.map(d => ({ ...d, type: 'EARTHQUAKE' }));
  } catch (err) {
    throw err.response?.data?.message || err.message || '지진/해일대피소 조회 실패';
  }
};
