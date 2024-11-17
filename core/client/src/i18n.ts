import { computed } from 'vue'
import { createI18n } from 'vue-i18n'
import enLocale from './locales/en-US'
import ruLocale from './locales/ru-RU'

type MessageSchema = typeof enLocale

const messages = {
  'en-US': enLocale,
  'ru-RU': ruLocale,
}

const getCurrentLocale = computed(() => {
  const storageLanguage = localStorage.getItem('i18n')
  if (storageLanguage) {
    return storageLanguage
  }
  if (navigator.language.split('-')[0] === 'ru') {
    return 'ru-RU'
  }
  return 'en-US'
})

const i18n = createI18n<[MessageSchema], 'en-US' | 'ru-RU'>({
  legacy: false,
  locale: getCurrentLocale.value,
  globalInjection: true,
  messages,
})

export default i18n
