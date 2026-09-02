import type {
  CabinMaterial,
  FormFeature,
  PerformanceStat,
  SectionId,
  TechCatalogItem,
  VideoSpec,
} from "../types";

export const BRAND = {
  name: "SABLE ACOUSTICS",
  flagship: "SABLE ONE",
  companion: "SABLE TT-1",
  tagline: "소리는, 보이지 않는 곳에서 시작된다.",
};

export const NAV_SECTIONS: { id: SectionId; label: string }[] = [
  { id: "the-machine", label: "Engineering" },
  { id: "performance", label: "Performance" },
  { id: "the-form", label: "Design" },
  { id: "the-source", label: "Source" },
  { id: "experience", label: "Experience" },
];

export const HERO_FILM: VideoSpec = {
  src: "/video/hero-film.mp4",
  poster: "/images/hero-poster.jpg",
  spec:
    "HERO FILM — 1920×1080, 16:9, 24fps+, 무음, 우퍼 보이스코일 클로즈업 → 크로스오버 → 인클로저 → SABLE ONE 전체 공개, 컷 없는 연속 촬영, 약 8초 소스를 스크롤 0–100%에 매핑",
  width: 1920,
  height: 1080,
};

export const FORM_FILM: VideoSpec = {
  src: "/video/the-form.mp4",
  poster: "/images/the-form-poster.jpg",
  spec:
    "THE FORM — 1920×1080, 16:9, 24fps+, 무음, 약 8초, 무향실 배경에서 SABLE ONE 측면 실루엣을 따라 흐르는 음파 시각화, 절제된 기술 시각화 톤",
  width: 1920,
  height: 1080,
};

export const SOURCE_FILM: VideoSpec = {
  src: "/video/the-source.mp4",
  poster: "/images/the-source-poster.jpg",
  spec:
    "THE SOURCE — 1920×1080, 16:9, 24fps+, 무음, 약 8초, SABLE TT-1 톤암·플래터·카트리지 매크로 클로즈업, 톤암이 레코드에 내려앉는 순간으로 마무리",
  width: 1920,
  height: 1080,
};

/** Three representative stills used by the prefers-reduced-motion fallback. */
export const REDUCED_MOTION_STILLS: { src: string; alt: string }[] = [
  { src: "/images/still-driver.jpg", alt: "보이스코일과 마그넷 갭 클로즈업" },
  { src: "/images/still-enclosure.jpg", alt: "인클로저 내부 구조" },
  { src: "/images/still-full.jpg", alt: "SABLE ONE 전체 외관" },
];

export const HERO_COPY = {
  stage1: "진동이 먼저 움직인다.",
  stage2: "정밀함이 울림을 만든다.",
  brandLine: BRAND.tagline,
  productLabel: "플래그십 청음 시스템",
  ctaPrimary: "ONE 살펴보기",
  ctaSecondary: "청음 예약",
};

export const THE_MACHINE = {
  title: "ENGINEERED FROM SILENCE",
  subtitle:
    "모든 울림은 하나의 부품이 아니라, 수천 번의 미세한 진동이 정확한 순간에 만날 때 만들어진다.",
  items: [
    {
      name: "DRIVER",
      description: "구리 보이스코일과 네오디뮴 마그넷이 만드는 정확한 왕복 운동.",
      specs: [
        { label: "Type", value: "Dual 10\" Copper-Wound Woofer" },
        { label: "Coil", value: "Copper-Clad Aluminum" },
      ] satisfies TechCatalogItem[],
    },
    {
      name: "CROSSOVER",
      description: "세 개의 대역을 위상 오차 없이 나누는 수동 네트워크.",
      specs: [
        { label: "Type", value: "3-Way Passive Crossover" },
        { label: "Slope", value: "24dB/oct" },
      ] satisfies TechCatalogItem[],
    },
    {
      name: "ENCLOSURE",
      description: "비주기적 브레이싱으로 공진을 근본에서 차단하는 구조.",
      specs: [
        { label: "Type", value: "Aperiodic Bracing Enclosure" },
        { label: "Material", value: "Solid Walnut Veneer" },
      ] satisfies TechCatalogItem[],
    },
  ],
};

export const PERFORMANCE = {
  title: "CONTROL THE SILENCE",
  stats: [
    { label: "Frequency Response", value: 22, suffix: "Hz–40kHz" },
    { label: "Max SPL", value: 118, suffix: "dB" },
    { label: "Total Harmonic Distortion", value: 0.1, decimals: 1, prefix: "<", suffix: "%" },
    { label: "Cabinet Weight", value: 68, suffix: "kg / unit" },
  ] satisfies PerformanceStat[],
};

export const THE_FORM = {
  title: "SHAPED BY SILENCE",
  body: "장식을 더하지 않았다.\n울림을 방해하는 모든 것을 제거했다.",
  features: [
    { label: "Aperiodic Bracing", description: "내부 공진을 원천에서 흡수하는 비주기적 구조." },
    { label: "Copper-Wound Voice Coil", description: "정확한 자기장 반응을 위한 구리 권선 코일." },
    { label: "Isolated Crossover Chamber", description: "간섭 없는 독립 크로스오버 챔버." },
    { label: "0.1% THD", description: "가청 왜곡 임계값 아래로 억제된 전고조파왜율." },
  ] satisfies FormFeature[],
};

export const THE_SOURCE = {
  title: "NOT A PLAYER.\nA RITUAL.",
  body: "당신과 음악 사이에 필요한 것만 남겼다.",
  materials: [
    { label: "솔리드 월넛 플린스", description: "공진을 흡수하는 고밀도 원목 베이스." },
    { label: "벨트 드라이브 DC 모터", description: "전기적 노이즈로부터 분리된 정속 회전." },
    { label: "알루미늄 톤암", description: "무게 중심을 정밀하게 제어하는 단조 알루미늄." },
    { label: "MC 카트리지", description: "미세한 그루브 변화까지 포착하는 무빙코일 방식." },
  ] satisfies CabinMaterial[],
};

export const EXPERIENCE = {
  headline: "기계의 첫 울림을 직접 느껴보십시오.",
  cta: "SABLE ONE 청음 예약",
};

export const COMPANY_INFO = {
  legalName: "SABLE ACOUSTICS 주식회사",
  address: "서울특별시 성동구 성수이로 20길 16, 3층 (성수동2가, 04794)",
  email: "hello@sable-acoustics.com",
  businessNumber: "215-88-01234",
  representativePhone: "02-6952-4801",
  hours: "평일 09:00 - 18:00 (주말/공휴일 휴무)",
};

export const REGION_OPTIONS = [
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "광주",
  "대전",
  "기타",
];

export const FOOTER_LINKS = {
  columns: [
    {
      heading: "SABLE",
      links: ["Models", "Engineering", "Design", "Experience", "Contact"],
    },
    {
      heading: "Follow",
      links: ["Instagram", "YouTube"],
    },
    {
      heading: "Legal",
      links: ["개인정보 처리방침", "이용약관"],
    },
  ],
};
