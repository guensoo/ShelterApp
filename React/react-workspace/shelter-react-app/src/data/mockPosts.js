// src/mock/mockPosts.js

const mockPosts = [
  // 📌 공지사항
  {
    id: 1,
    title: "🚨 시스템 점검 안내",
    content: "<p>2025년 6월 20일 00:00~04:00까지 점검이 예정되어 있습니다.</p>",
    author: "admin",
    createdAt: "2025-06-14",
    isNotice: true,
  },
  {
    id: 2,
    title: "📢 여름 한정 이벤트 시작!",
    content: "<p>폭염 대비 쉼터 이용 캠페인을 시작합니다!</p>",
    author: "운영자",
    createdAt: "2025-06-13",
    isNotice: true,
  },

  // ✅ 일반 자유글
  {
    id: 3,
    title: "오늘 날씨 진짜 덥네요 🥵",
    content: "<p>진심 더위 먹을 뻔했어요. 쉼터 덕분에 살았습니다.</p>",
    author: "cool_user",
    createdAt: "2025-06-15",
    isNotice: false,
  },
  {
    id: 4,
    title: "쉼터 위치 이상해요",
    content: "<p>주소랑 실제 위치가 달라요. 수정 부탁드려요.</p>",
    author: "열받은시민",
    createdAt: "2025-06-14",
    isNotice: false,
  },
  {
    id: 5,
    title: "좋은 쉼터 추천합니다",
    content: "<p>구래동 근처 ○○쉼터 좋아요. 시원하고 넓어요.</p>",
    author: "guensoo97",
    createdAt: "2025-06-13",
    isNotice: false,
  },
  {
    id: 6,
    title: "한파 대비 질문 있어요",
    content: "<p>겨울엔 어디로 가야 하나요? 무더위쉼터만 보여요.</p>",
    author: "newbie",
    createdAt: "2025-06-12",
    isNotice: false,
  },
  {
    id: 7,
    title: "쉼터 정보 너무 잘돼있네요",
    content: "<p>덕분에 무더위에 걱정이 없어요! 고맙습니다.</p>",
    author: "감사합니다",
    createdAt: "2025-06-12",
    isNotice: false,
  },
];

export default mockPosts;
