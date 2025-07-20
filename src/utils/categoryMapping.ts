import { type NewsSource } from "../types/news.types";

export const CATEGORY_MAPPING: Record<
  string,
  Partial<Record<NewsSource, string>>
> = {
  beranda: {
    antara: "terbaru",
    cnbc: "terbaru",
    cnn: "terbaru",
    jpnn: "terbaru",
    kumparan: "terbaru",
    merdeka: "terbaru",
    okezone: "terbaru",
    republika: "terbaru",
    sindonews: "terbaru",
    suara: "terbaru",
    tribun: "terbaru",
  },
  kesehatan: {
    merdeka: "sehat",
    suara: "health",
    tribun: "kesehatan",
    antara: "lifestyle",
    sindonews: "lifestyle",
    cnbc: "lifestyle",
    cnn: "gayaHidup",
    okezone: "lifestyle",
  },
  otomotif: {
    antara: "otomotif",
    merdeka: "otomotif",
    okezone: "otomotif",
    sindonews: "otomotif",
    suara: "otomotif",
    tempo: "otomotif",
    tribun: "otomotif",
  },
  politik: {
    antara: "politik",
  },
  olahraga: {
    antara: "olahraga",
    cnn: "olahraga",
    merdeka: "olahraga",
    okezone: "sports",
    sindonews: "sports",
    tribun: "sport",
  },
  nasional: {
    cnn: "nasional",
    sindonews: "nasional",
    tempo: "nasional",
  },
  internasional: {
    cnn: "internasional",
    republika: "internasional",
    sindonews: "international",
    tempo: "dunia",
  },
};

export const CATEGORIES = Object.keys(CATEGORY_MAPPING);

export const getSourcesForCategory = (category: string): NewsSource[] => {
  const mapping = CATEGORY_MAPPING[category];
  if (!mapping) return [];
  return Object.keys(mapping) as NewsSource[];
};

export const HOMEPAGE_FETCH_STRATEGY = [
  { source: 'antara', category: 'terbaru' },
  { source: 'cnn', category: 'nasional' },
  { source: 'cnbc', category: 'market' },
  { source: 'tribun', category: 'sport' },
  { source: 'merdeka', category: 'teknologi' },
  { source: 'okezone', category: 'celebrity' },
  { source: 'sindonews', category: 'ekbis' },
  { source: 'tempo', category: 'bisnis' },
  { source: 'republika', category: 'internasional' },
  { source: 'suara', category: 'health' },
  { source: 'antara', category: 'politik' },
  { source: 'cnn', category: 'olahraga' },
  { source: 'merdeka', category: 'otomotif' },
  { source: 'tribun', category: 'lifestyle' },
  { source: 'okezone', category: 'techno' },
  { source: 'sindonews', category: 'metro' },
]

export const CATEGORY_LABELS: Record<string, string> = {
  terbaru: "Terbaru",
  nasional: "Nasional",
  politik: "Politik",
  ekonomi: "Ekonomi",
  market: "Ekonomi",
  ekbis: "Ekonomi",
  bisnis: "Ekonomi",
  sport: "Olahraga",
  sports: "Olahraga",
  bola: "Olahraga",
  olahraga: "Olahraga",
  teknologi: "Teknologi",
  tekno: "Teknologi",
  tech: "Teknologi",
  techno: "Teknologi",
  international: "Internasional",
  internasional: "Internasional",
  dunia: "Internasional",
  hiburan: "Hiburan",
  entertainment: "Hiburan",
  celebrity: "Hiburan",
  seleb: "Hiburan",
  lifestyle: "Lifestyle",
  gayahidup: "Lifestyle",
  otomotif: "Otomotif",
  kesehatan: "Kesehatan",
  health: "Kesehatan",
  sehat: "Kesehatan",
};
