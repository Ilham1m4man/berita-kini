export interface NewsPost {
  link: string;
  title: string;
  pubDate: string;
  description: string;
  thumbnail: string;
}

export interface NewsResponse {
  success: boolean;
  message: string | null;
  data: {
    link: string;
    description: string;
    title: string;
    image: string;
    posts: NewsPost[];
  };
}

export type NewsSource = 
  | 'antara' 
  | 'cnbc' 
  | 'cnn' 
  | 'jpnn' 
  | 'kumparan' 
  | 'merdeka' 
  | 'okezone' 
  | 'republika' 
  | 'sindonews' 
  | 'suara' 
  | 'tempo' 
  | 'tribun'

export const NEWS_CATEGORIES: Record<NewsSource, string[]> = {
  antara: ['terbaru', 'politik', 'hukum', 'ekonomi', 'bola', 'olahraga', 'humaniora', 'lifestyle', 'hiburan', 'dunia', 'tekno', 'otomotif'],
  cnbc: ['terbaru', 'investment', 'news', 'market', 'entrepreneur', 'syariah', 'tech', 'lifestyle', 'opini', 'profil'],
  cnn: ['terbaru', 'nasional', 'internasional', 'ekonomi', 'olahraga', 'teknologi', 'hiburan', 'gayahidup'],
  jpnn: ['terbaru'],
  kumparan: ['terbaru'],
  merdeka: ['terbaru', 'jakarta', 'dunia', 'gaya', 'olahraga', 'teknologi', 'otomotif', 'khas', 'sehat', 'jateng'],
  okezone: ['terbaru', 'celebrity', 'sports', 'otomotif', 'economy', 'techno', 'lifestyle', 'bola'],
  republika: ['terbaru', 'news', 'daerah', 'khazanah', 'islam', 'internasional', 'bola', 'leisure'],
  sindonews: ['terbaru', 'nasional', 'metro', 'ekbis', 'international', 'daerah', 'sports', 'otomotif', 'tekno', 'sains', 'edukasi', 'lifestyle', 'kalam'],
  suara: ['terbaru', 'bisnis', 'bola', 'lifestyle', 'entertainment', 'otomotif', 'tekno', 'health'],
  tempo: ['nasional', 'bisnis', 'metro', 'dunia', 'bola', 'cantik', 'tekno', 'otomotif', 'seleb', 'gaya', 'travel', 'difabel', 'creativelab', 'inforial', 'event'],
  tribun: ['terbaru', 'bisnis', 'superskor', 'sport', 'seleb', 'lifestyle', 'travel', 'parapuan', 'otomotif', 'techno', 'kesehatan'],
}