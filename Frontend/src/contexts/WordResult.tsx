// src/contexts/WordResult.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface WordReading {
  kana: string;
  kanji?: string;
  furigana?: string | null;
}

interface WordSense {
  glosses: string[];
  pos?: (string | Record<string, string>)[];
  language: string;
  information?: string;
  misc?: string;
  xref?: string;
}

export interface Word {
  reading: WordReading;
  senses: WordSense[];
  audio?: string;
  pitch?: { part: string; high: boolean }[];
}

// 🔑 New context type: includes both keyword + results
interface SearchResultContextType {
  keyword: string;
  setKeyword: (value: string) => void;
  results: Word[];
  setResults: (words: Word[]) => void;
}

const SearchResultContext = createContext<SearchResultContextType | undefined>(undefined);

export const SearchResultProvider = ({ children }: { children: ReactNode }) => {
  const [keyword, setKeyword] = useState<string>('');
  const [results, setResults] = useState<Word[]>([]);

  return (
    <SearchResultContext.Provider value={{ keyword, setKeyword, results, setResults }}>
      {children}
    </SearchResultContext.Provider>
  );
};

// Custom hook
export const useSearchResult = () => {
  const context = useContext(SearchResultContext);
  if (!context) {
    throw new Error('useSearchResult must be used within a SearchResultProvider');
  }
  return context;
};