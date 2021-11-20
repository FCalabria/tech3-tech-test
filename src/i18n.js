import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)


const datesFormat = {
  short: {
    year: 'numeric', month: '2-digit', day: '2-digit'
  },
  shortTime: {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false
  },
  long: {
    year: 'numeric', month: 'short', day: 'numeric',
    weekday: 'short', hour: 'numeric', minute: 'numeric'
  }
}

const locales = require.context('./', true, /[A-Za-z0-9-_,\s]+\.json$/i)
function getLocaleFromKey (key) {
  const matched = key.match(/([A-Za-z0-9-_]+)\./i)
  if (matched && matched.length > 1) {
    return matched[1]
  } else {
    return ''
  }
}
function loadLocaleMessages () {
  const messages = {}
  locales.keys().forEach(key => {
    const locale = getLocaleFromKey(key)
    if (locale) {
      messages[locale] = locales(key)
    }
  })
  return messages
}
function loadLocaleDateFormat () {
  const dateFormats = {}
  locales.keys().forEach(key => {
    const locale = getLocaleFromKey(key)
    if (locale) {
      dateFormats[locale] = datesFormat
    }
  })
  return dateFormats
}
export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages(),
  datetimeFormats: loadLocaleDateFormat(),
})
