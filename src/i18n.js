import { createI18n } from 'vue-i18n'

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key).default
    }
  })
  return messages
}

function getLang(){
  if(document.cookie){
    const langPos = document.cookie.indexOf('lang')                                   //document.cookie.slice(c, c+7).split('=')[1]
    if(langPos != -1){
      const langE = document.cookie.slice(langPos, langPos+7)
      if(typeof langE != 'undefined'){
        return langE.split('=')[1]
      }
    }
  }
}

export { getLang }

export default createI18n({
  legacy: false,
  locale: getLang() || process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
