// src/api/geocode.js
export function addressToLatLng(address) {
  return new Promise((resolve, reject) => {
    if (!window.naver || !window.naver.maps) return reject("네이버맵 미로드");
    const geocoder = new window.naver.maps.Service.Geocoder();
    geocoder.geocode({ address }, function(status, response) {
      if (status !== window.naver.maps.Service.Status.OK) {
        resolve(null);
        return;
      }
      const result = response.v2.addresses[0];
      if (!result) {
        resolve(null);
        return;
      }
      resolve({
        lat: parseFloat(result.y),
        lng: parseFloat(result.x),
      });
    });
  });
}

export async function getProcessedShelters(shelters) {
  const processed = await Promise.all(
    shelters.map(async shelter => {
      if (shelter.lat && shelter.lng) return shelter;
      if (!shelter.address) return null;
      const geo = await addressToLatLng(shelter.address);
      if (!geo) return null;
      return { ...shelter, lat: geo.lat, lng: geo.lng };
    })
  );
  return processed.filter(Boolean);
}
