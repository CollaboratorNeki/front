//importa os arquivos json com as traduções e implementa a lógica para traduzir/esta faltando implementar um botao, farei em breve
//os arquivos de tradução estão tarduzindo a palavra home somente para teste

import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import ptbr from './locales/pt-br/pt-br.json'
import enus from './locales/en/en-us.json'

const resources = {
    'pt-br' : ptbr,
    'en-us' : enus
}

i18n
.use(initReactI18next)
.init({
    resources: {
        en: {...enus},
        pt: {...ptbr}
    },
    lng: 'en',
    interpolation: {
        escapeValue:false,
    }

})

export default i18n;