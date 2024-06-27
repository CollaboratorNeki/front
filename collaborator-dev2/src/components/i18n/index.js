// Importa o i18next para gerenciamento de traduções e inicialização para React
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; // Importa a função de inicialização do i18next para React
import ptbr from './locales/pt-br/pt-br.json'; // Importa o arquivo JSON com as traduções para pt-br
import enus from './locales/en/en-us.json'; // Importa o arquivo JSON com as traduções para en-us


// Define os recursos disponíveis para tradução
const resources = {
    'pt-br': ptbr,
    'en-us': enus
};

// Configuração e inicialização do i18next para uso com React
i18n
    .use(initReactI18next) // Utiliza o initReactI18next para integrar o i18next ao React
    .init({
        resources: {
            en: { ...enus }, // Recursos de tradução para inglês
            pt: { ...ptbr } // Recursos de tradução para português
        },
        lng: 'pt', // Define o idioma padrão como português
        interpolation: {
            escapeValue: false // Desativa a necessidade de escapar valores nas traduções
        }
    });

export default i18n; // Exporta a instância do i18n configurada para uso em toda a aplicação
