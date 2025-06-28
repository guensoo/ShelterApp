// src/api/naverReverseGeocode.js
import axios from "axios";

// 환경변수에서 키 읽기 (반드시 .env에 실제 값 넣기)
const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_MAP_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.REACT_APP_NAVER_MAP_CLIENT_SECRET;

// JSON 파싱 함수
export function parseNaverReverseGeocodeResult(data) {
  // 도로명 주소 우선 반환
  const roadaddr = data.results?.find(r => r.name === "roadaddr");
  if (roadaddr && roadaddr.region && roadaddr.land) {
    const area1 = roadaddr.region.area1.name || "";
    const area2 = roadaddr.region.area2.name || "";
    const area3 = roadaddr.region.area3.name || "";
    const roadName = roadaddr.land.name || "";
    const mainNumber = roadaddr.land.number1 || "";
    // 도로명 주소
    return `${area1} ${area2} ${area3} ${roadName} ${mainNumber}`.replace(/\s+/g, " ").trim();
  }
  // 지번 주소
  const addr = data.results?.find(r => r.name === "addr");
  if (addr && addr.region && addr.land) {
    const area1 = addr.region.area1.name || "";
    const area2 = addr.region.area2.name || "";
    const area3 = addr.region.area3.name || "";
    const area4 = addr.region.area4.name || "";
    const number1 = addr.land.number1 || "";
    const number2 = addr.land.number2 ? "-" + addr.land.number2 : "";
    return `${area1} ${area2} ${area3} ${area4} ${number1}${number2}`.replace(/\s+/g, " ").trim();
  }
  return "";
}

// API 호출 함수
export async function naverReverseGeocode(lat, lng) {
  try {
    const url = `https://maps.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${lng},${lat}&output=json&orders=roadaddr,addr`;
    const res = await axios.get(url, {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": NAVER_CLIENT_ID,
        "X-NCP-APIGW-API-KEY": NAVER_CLIENT_SECRET,
      },
    });
    console.log("네이버 역지오코딩 응답:", res.data);
    return parseNaverReverseGeocodeResult(res.data);
  } catch (e) {
    // console.error("네이버 리버스지오코딩 오류:", e);
    return "";
  }
}
