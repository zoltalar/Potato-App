export default function ({ i18n, store }) {
  const locale = i18n.locale
  if (store.getters['language/code'] !== locale) {
    store.dispatch('language/code', locale)
  }
}
