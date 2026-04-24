import { createContext, useContext, useState } from 'react';
import { getTranslation } from '../utils/translations';

const LanguageContext = createContext();

export const langCodes = {
  English: 'en',
  Hindi: 'hi',
  Tamil: 'ta',
  Telugu: 'te',
  Bengali: 'bn',
  Kannada: 'kn'
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('English');
  const t = (key, params) => getTranslation(language, key, params);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
